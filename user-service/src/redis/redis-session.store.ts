import {
	Injectable,
	OnApplicationShutdown,
	OnModuleInit,
} from "@nestjs/common";
import {
	AuthenticationStorage,
	SessionRecord,
	SessionStore,
} from "@nestjs/authentication";
import { ConfigService } from "@nestjs/config";
import { createClient } from "redis";

const TOUCH_SESSION_SCRIPT = `
local data = redis.call("GET", KEYS[1])
if not data then 
	return 0
end

local record = cjson.decode(data)
local current = tonumber(string.match(record.lastActiveAt, "^(%d+)"))
local next = tonumber(ARGV[1])
if current and current >= next then
	return 0
end

record.lastActiveAt = ARGV[2]
redis.call("SET", KEYS[1], cjson.encode(record), "XX", "KEEPTTL")
return 1
`;

const DELETE_USER_SESSIONS_SCRIPT = `
local indexKey = KEYS[1]
local ids = redis.call("ZRANGE", indexKey, 0, -1)
for _, id in ipairs(ids) do
	redis.call("DEL", ARGV[1] .. id)
end
redis.call("DEL", indexKey)
return #ids
`;

@Injectable()
export class RedisSessionStore
	implements SessionStore, OnModuleInit, OnApplicationShutdown
{
	private readonly client;
	private readonly keyPrefix = "user-service:session";
	private readonly userIndexPrefix = "user-service:user-sessions";

	constructor(config: ConfigService, storage: AuthenticationStorage) {
		this.client = createClient({
			url: config.get<string>("REDIS_URL", "redis://localhost:6379"),
		});
		this.client.on("error", (err) => console.error("Redis Client Error", err));
		storage.registerSource({ sessions: this });
	}

	async onModuleInit(): Promise<void> {
		await this.client.connect();
	}
	async onApplicationShutdown(): Promise<void> {
		if (this.client.isOpen) await this.client.quit();
	}

	async getSession(id: string): Promise<SessionRecord | undefined> {
		const value = await this.client.get(this.sessionKey(id));
		if (!value) {
			return undefined;
		}

		const record = JSON.parse(value) as Omit<
			SessionRecord,
			"createdAt" | "expiresAt" | "lastActiveAt"
		> & {
			createdAt: Date;
			expiresAt: Date;
			lastActiveAt: Date;
		};

		return {
			...record,
			createdAt: new Date(record.createdAt),
			expiresAt: new Date(record.expiresAt),
			lastActiveAt: new Date(record.lastActiveAt),
		};
	}

	async createSession(record: SessionRecord): Promise<void> {
		const ttl = record.expiresAt.getTime() - Date.now();
		if (ttl <= 0) {
			throw new RangeError("Cannot store an already expired session");
		}

		const { extra: _extra, ...persistedRecord } = record;

		const data = JSON.stringify(persistedRecord);

		await this.client
			.multi()
			.set(this.sessionKey(record.id), data, { PX: ttl })
			.zAdd(this.userIndexKey(record.userId), {
				score: record.expiresAt.getTime(),
				value: record.id,
			})
			.exec();
	}

	async touchSession(id: string, lastActiveAt: Date): Promise<void> {
		await this.client.eval(TOUCH_SESSION_SCRIPT, {
			keys: [this.sessionKey(id)],
			arguments: [String(lastActiveAt.getTime()), lastActiveAt.toISOString()],
		});
	}
	async deleteSession(id: string): Promise<boolean> {
		const deleted = await this.client.eval(
			`
			local data = redis.call("GET", KEYS[1])
			if not data then 
				return 0
			end
			local record = cjson.decode(data)
			redis.call("DEL", KEYS[1])
			redis.call("ZREM", ARGV[1] .. record.userId, record.id)
			return 1
			`,
			{
				keys: [this.sessionKey(id)],
				arguments: [this.userIndexPrefix],
			}
		);
		return Number(deleted) === 1;
	}
	async listUserSessions(userId: string): Promise<SessionRecord[]> {
		const indexKey = this.userIndexKey(userId);
		const ids = await this.client.zRange(indexKey, 0, -1);
		const sessions = await Promise.all(ids.map((id) => this.getSession(id)));
		const records: SessionRecord[] = [];
		const staleIds: string[] = [];

		for (let i = 0; i < ids.length; i++) {
			const record = sessions[i];
			if (record) {
				records.push(record);
			} else {
				staleIds.push(ids[i]);
			}
		}

		if (staleIds.length > 0) {
			await this.client.zRem(indexKey, staleIds);
		}

		return records;
	}
	async deleteUserSessions(userId: string): Promise<void> {
		await this.client.eval(DELETE_USER_SESSIONS_SCRIPT, {
			keys: [this.userIndexKey(userId)],
			arguments: [this.keyPrefix],
		});
	}

	private sessionKey(id: string): string {
		return `${this.keyPrefix}${id}`;
	}

	private userIndexKey(userId: string): string {
		return `${this.userIndexPrefix}${userId}`;
	}
}
