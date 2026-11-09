import { ConflictException, Injectable } from "@nestjs/common";
import { PasswordHasher } from "@nestjs/authentication";
import { UsersRepository } from "../users/users.repository.js";
import { User } from "../users/user.js";

@Injectable()
export class CredentialsService {
	constructor(
		private readonly usersRepository: UsersRepository,
		private readonly passwordHasher: PasswordHasher
	) {}

	async register(email: string, password: string): Promise<User> {
		if (await this.usersRepository.findByEmail(email)) {
			throw new ConflictException("Email already registered");
		}
		return this.usersRepository.create({
			email,
			passwordHash: await this.passwordHasher.hash(password),
		});
	}

	async verify(email: string, password: string): Promise<User | null> {
		const found = await this.usersRepository.findCredentials(email);
		const valid = await this.passwordHasher.verify(
			password,
			found?.passwordHash ?? ""
		);
		if (!valid || !found?.passwordHash) {
			return null;
		}
		if (this.passwordHasher.needsRehash(found.passwordHash)) {
			await this.usersRepository.updatePasswordHash(
				found.user.id,
				await this.passwordHasher.hash(password)
			);
		}
		return found.user;
	}
}
