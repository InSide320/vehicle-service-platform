import { Injectable } from "@nestjs/common";
import { CreateVehicleDto } from "./dto/create-vehicle.dto.js";
import { UpdateVehicleDto } from "./dto/update-vehicle.dto.js";
import { PrismaService } from "../prisma/index.js";

@Injectable()
export class VehiclesService {
	constructor(private readonly prisma: PrismaService) {}

	create(createVehicleDto: CreateVehicleDto) {
		return "This action adds a new vehicle";
	}

	findAll() {
		return `This action returns all vehicles`;
	}

	findOne(id: string) {
		return `This action returns a #${id} vehicle`;
	}

	update(id: string, updateVehicleDto: UpdateVehicleDto) {
		return `This action updates a #${id} vehicle`;
	}

	remove(id: string) {
		return `This action removes a #${id} vehicle`;
	}

	async createForNewUser(userId: string) {
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

	async findAllForUser(userId: string) {
		return await this.prisma.vehicle.findMany({
			where: {
				userId,
			},
		});
	}
}
