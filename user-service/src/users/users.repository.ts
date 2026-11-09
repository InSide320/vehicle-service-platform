import { randomUUID } from "node:crypto";
import { Injectable } from "@nestjs/common";
import type { User } from "./user.js";
import { PrismaService } from "../prisma/index.js";
import { normalize, toUser } from "./utils/users.utils.js";
import { Role } from "../generated/prisma/enums.js";
import { CreateUserHashDto } from "./dto/create-user.dto.js";

@Injectable()
export class UsersRepository {
	constructor(private readonly prisma: PrismaService) {}

	async create(createUserDto: CreateUserHashDto): Promise<User> {
		const user = await this.prisma.user.create({
			data: {
				id: randomUUID(),
				email: normalize(createUserDto.email),
				passwordHash: createUserDto.passwordHash,
				emailVerified: false,
				role: Role.user,
				updatedAt: null,
			},
		});
		return toUser(user);
	}

	async findAll(): Promise<User[]> {
		const users = await this.prisma.user.findMany();
		return users.map(toUser);
	}

	async findById(id: string): Promise<User | null> {
		const user = await this.prisma.user.findUnique({ where: { id } });
		return user ? toUser(user) : null;
	}

	async findByEmail(email: string): Promise<User | null> {
		const user = await this.findUser(email);
		return user ? toUser(user) : null;
	}

	/** For password sign-in only. */
	async findCredentials(
		email: string
	): Promise<{ user: User; passwordHash: string | null } | null> {
		const user = await this.findUser(email);
		return user
			? { user: toUser(user), passwordHash: user.passwordHash }
			: null;
	}

	async updatePasswordHash(id: string, hashedPassword: string): Promise<void> {
		const user = await this.prisma.user.findUnique({ where: { id } });
		if (user) {
			user.passwordHash = hashedPassword;
			user.updatedAt = new Date();
			await this.prisma.user.update({ where: { id }, data: user });
		}
	}

	async updateEmail(id: string, email: string): Promise<User | null> {
		const user = await this.prisma.user.findUnique({ where: { id } });
		if (!user) {
			return null;
		}
		user.email = normalize(email);
		user.emailVerified = false;
		user.updatedAt = new Date();
		await this.prisma.user.update({ where: { id }, data: user });
		return toUser(user);
	}

	async remove(id: string): Promise<User | null> {
		const user = await this.prisma.user.findUnique({ where: { id } });
		if (!user) {
			return null;
		}
		await this.prisma.user.delete({ where: { id } });
		return toUser(user);
	}

	private async findUser(email: string) {
		const normalized = normalize(email);
		return await this.prisma.user
			.findMany()
			.then((users) => users.find((user) => user.email === normalized));
	}

	async markEmailVerifies(id: string, email: string) {
		const user = await this.prisma.user.findUnique({ where: { id } });
		if (user?.email !== normalize(email)) {
			return false;
		}
		user.emailVerified = true;
		await this.prisma.user.update({ where: { id }, data: user });
		return true;
	}
}
