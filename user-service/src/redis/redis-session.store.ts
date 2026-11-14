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

		console.log(`Retrieved session from Redis: ${value}`);
		console.log(`JSON.stringify(value): ${JSON.stringify(value)}`);

		const record = JSON.parse(value) as Omit<
			SessionRecord,
			"createdAt" | "expiresAt" | "lastActiveAt"
		> & {
			createdAt: Date;
			expiresAt: Date;
			lastActiveAt: Date;
		};

		console.log(`Parsed session record: ${JSON.stringify(record)}`);

		return {
			...record,
			createdAt: new Date(record.createdAt),
			expiresAt: new Date(record.expiresAt),
			lastActiveAt: new Date(record.lastActiveAt),
		};
	}

	async createSession(record: SessionRecord): Promise<void> {
		await this.client.set(this.sessionKey(record.id), JSON.stringify(record));
	}
	async touchSession(id: string, lastActiveAt: Date): Promise<void> {
		const session = await this.getSession(id);
		if (session) {
			session.lastActiveAt = lastActiveAt;
			await this.createSession(session);
		}
	}
	async deleteSession(id: string): Promise<boolean> {
		const result = await this.client.del(this.sessionKey(id));
		return result > 0;
	}
	listUserSessions(userId: string): Promise<SessionRecord[]> {
		throw new Error("Method not implemented.");
	}
	deleteUserSessions(userId: string): Promise<void> {
		throw new Error("Method not implemented.");
	}

	private sessionKey(id: string): string {
		return `${this.keyPrefix}:${id}`;
	}
}
