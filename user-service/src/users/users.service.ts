import {
	BadRequestException,
	HttpException,
	InternalServerErrorException,
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
import type { Observable } from "rxjs";
import { CreateVehicleDto } from "./dto/create-vehicle.dto.js";
import { UpdateVehicleDto } from "./dto/update-vehicle.dto.js";

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

	async getVehicles(userId: string) {
		return this.requestVehicleService(() =>
			this.vehicleServiceClient.send("get_vehicles", { userId })
		);
	}

	async getVehicleByUser(vehicleId: string, userId: string) {
		return this.requestVehicleService(() =>
			this.vehicleServiceClient.send("get_vehicle_by_id", {
				id: vehicleId,
				userId,
			})
		);
	}

	async createVehicleForUser(userId: string, dto: CreateVehicleDto) {
		await this.findOne(userId);
		return this.requestVehicleService(() =>
			this.vehicleServiceClient.send("create_vehicle", { ...dto, userId })
		);
	}

	updateVehicleForUser(
		userId: string,
		vehicleId: string,
		dto: UpdateVehicleDto
	) {
		if (Object.keys(dto).length === 0) {
			throw new BadRequestException(
				"At least one vehicle field must be provided"
			);
		}
		return this.requestVehicleService(() =>
			this.vehicleServiceClient.send("update_vehicle", {
				id: vehicleId,
				userId,
				data: dto,
			})
		);
	}

	async removeVehicleForUser(userId: string, vehicleId: string) {
		return await this.requestVehicleService(() =>
			this.vehicleServiceClient.send("delete_vehicle", {
				id: vehicleId,
				userId,
			})
		);
	}

	private async requestVehicleService<T>(
		request: () => Observable<T>
	): Promise<T> {
		try {
			return await firstValueFrom(request());
		} catch (error) {
			const rpcError = error as { statusCode?: number; message?: string };
			if (rpcError.statusCode && rpcError.message) {
				throw new HttpException(rpcError.message, rpcError.statusCode);
			}
			throw new InternalServerErrorException("Vehicle service request failed");
		}
	}
}
