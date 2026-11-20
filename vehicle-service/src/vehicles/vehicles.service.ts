import { Injectable } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { CreateVehicleDto } from "./dto/create-vehicle.dto.js";
import { UpdateVehicleDto } from "./dto/update-vehicle.dto.js";
import { PrismaService } from "../prisma/index.js";

@Injectable()
export class VehiclesService {
	constructor(private readonly prisma: PrismaService) {}

	create(createVehicleDto: CreateVehicleDto) {
		return this.prisma.vehicle.create({
			data: {
				make: createVehicleDto.make,
				model: createVehicleDto.model,
				year: createVehicleDto.year,
				userId: createVehicleDto.userId,
			},
		});
	}

	async createVehicleForNewUser(userId: string) {
		const existingVehicle = await this.prisma.vehicle.findFirst({
			where: {
				userId,
			},
		});

		if (existingVehicle) {
			return existingVehicle;
		}
		return this.prisma.vehicle.create({
			data: {
				userId,
			},
		});
	}

	async findVehiclesByUser(userId: string) {
		return await this.prisma.vehicle.findMany({
			where: {
				userId,
			},
		});
	}

	async findVehicleByUser(id: string, userId: string) {
		const vehicle = await this.prisma.vehicle.findFirst({
			where: {
				id,
				userId,
			},
		});
		if (!vehicle) {
			throw new RpcException({ statusCode: 404, message: "Vehicle not found" });
		}
		return vehicle;
	}

	async updateForUser(id: string, userId: string, data: UpdateVehicleDto) {
		const result = await this.prisma.vehicle.updateMany({
			where: { id, userId },
			data,
		});
		if (result.count === 0) {
			throw new RpcException({ statusCode: 404, message: "Vehicle not found" });
		}
		return this.prisma.vehicle.findFirstOrThrow({ where: { id, userId } });
	}

	async removeForUser(id: string, userId: string) {
		const result = await this.prisma.vehicle.deleteMany({ where: { id, userId } });
		if (result.count === 0) {
			throw new RpcException({ statusCode: 404, message: "Vehicle not found" });
		}
		return { id, deleted: true };
	}
}
