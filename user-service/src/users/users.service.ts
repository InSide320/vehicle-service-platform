import { Injectable } from "@nestjs/common";
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
		return await this.userRepository.findById(id);
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
