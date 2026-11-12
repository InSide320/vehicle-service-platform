import { Injectable } from "@nestjs/common";
import { SessionRecord, SessionStore } from "@nestjs/authentication";

@Injectable()
export class RedisSessionStore implements SessionStore {
	getSession(id: string): Promise<SessionRecord | undefined> {

		throw new Error("Method not implemented.");
	}
	createSession(record: SessionRecord): Promise<void> {
		throw new Error("Method not implemented.");
	}
	touchSession(id: string, lastActiveAt: Date): Promise<void> {
		throw new Error("Method not implemented.");
	}
	deleteSession(id: string): Promise<boolean> {
		throw new Error("Method not implemented.");
	}
	listUserSessions(userId: string): Promise<SessionRecord[]> {
		throw new Error("Method not implemented.");
	}
	deleteUserSessions(userId: string): Promise<void> {
		throw new Error("Method not implemented.");
	}
}
