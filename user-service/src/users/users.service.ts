import {
	BadRequestException,
	Inject,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { isUUID } from "class-validator";
import { UsersRepository } from "./users.repository.js";
import { UpdateUserPasswordDto } from "./dto/update-user-password.dto.js";
import { CreateUserDto, CreateUserHashDto } from "./dto/create-user.dto.js";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";

@Injectable()
export class UsersService {
	constructor(
		private readonly userRepository: UsersRepository,
		@Inject("VEHICLE_SERVICE")
		private readonly vehicleServiceClient: ClientProxy
	) {}

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

	async getVehicles(userId: string) {
		return await firstValueFrom(
			this.vehicleServiceClient.send("get_vehicles", { userId })
		);
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
