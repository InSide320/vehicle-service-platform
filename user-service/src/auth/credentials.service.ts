import { ConflictException, Inject, Injectable, Logger } from "@nestjs/common";
import { PasswordHasher } from "@nestjs/authentication";
import { UsersRepository } from "../users/users.repository.js";
import { User } from "../users/user.js";
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class CredentialsService {
	constructor(
		private readonly usersRepository: UsersRepository,
		private readonly passwordHasher: PasswordHasher,
		@Inject("VEHICLE_EVENTS") private readonly vehicleEvents: ClientProxy
	) {}

	private readonly logger = new Logger(CredentialsService.name);

	async register(email: string, password: string): Promise<User> {
		if (await this.usersRepository.findByEmail(email)) {
			throw new ConflictException("Email already registered");
		}
		const user = await this.usersRepository.create({
			email,
			passwordHash: await this.passwordHasher.hash(password),
		});
		this.vehicleEvents
			.emit("USER_CREATED", {
				type: "USER_CREATED",
				data: { id: user.id, email: user.email },
			})
			.subscribe({
				error: (err: unknown) =>
					this.logger.error("Failed to emit USER_CREATED event", err),
			});
		return user;
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
