import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { isUUID } from "class-validator";
import { CreateUserDto, CreateUserHashDto } from "./dto/create-user.dto.js";
import { UsersRepository } from "./users.repository.js";
import { UpdateUserPasswordDto } from "./dto/update-user-password.dto.js";

@Injectable()
export class UsersService {
	constructor(private readonly userRepository: UsersRepository) {}

	async create(dto: CreateUserDto) {
		const dtoHash: CreateUserHashDto = {
			email: dto.email,
			passwordHash: dto.password,
		};
		return await this.userRepository.create(dtoHash);
	}

	async findAll() {
		return await this.userRepository.findAll();
	}

	async findOne(id: string) {
		if (!isUUID(id)) {
			throw new BadRequestException("Invalid user id");
		}

		const user = await this.userRepository.findById(id);
		if (!user) {
			throw new NotFoundException(`User with id ${id} was not found`);
		}
		return user;
	}

	async updateEmail(id: string, email: string) {
		return await this.userRepository.updateEmail(id, email);
	}
	async updatePassword(id: string, dto: UpdateUserPasswordDto) {
		const hashedPassword: string = dto.newPassword;
		return await this.userRepository.updatePasswordHash(id, hashedPassword);
	}

	async remove(id: string) {
		return await this.userRepository.remove(id);
	}
}
