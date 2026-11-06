import { Injectable } from "@nestjs/common";
import {
	AuthenticationRegistry,
	SessionCookieProvider,
	SessionRecord,
} from "@nestjs/authentication";
import { User } from "../users/user.js";
import { UsersRepository } from "../users/users.repository.js";

@Injectable()
export class SessionAuth extends SessionCookieProvider<User> {
	constructor(
		private readonly usersRepository: UsersRepository,
		registry: AuthenticationRegistry
	) {
		super();
		registry.registerProvider(this);
	}
	protected validate(session: SessionRecord) {
		return this.usersRepository.findById(session.userId);
	}
}
