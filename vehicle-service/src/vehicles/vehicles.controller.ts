import { Controller } from "@nestjs/common";
import { VehiclesService } from "./vehicles.service.js";
import { EventPattern, MessagePattern, Payload } from "@nestjs/microservices";
import { CreateVehicleDto } from "./dto/create-vehicle.dto.js";
import { UpdateVehicleDto } from "./dto/update-vehicle.dto.js";

@Controller("vehicles")
export class VehiclesController {
	constructor(private readonly vehiclesService: VehiclesService) {}

	@EventPattern("USER_CREATED")
	handleUserCreatedEvent(
		@Payload()
		event: {
			type: "USER_CREATED";
			data: { id: string; email: string };
		}
	) {
		return this.vehiclesService.createVehicleForNewUser(event.data.id);
	}

	@MessagePattern("get_vehicles")
	getVehiclesByUser(data: { userId: string }) {
		return this.vehiclesService.findVehiclesByUser(data.userId);
	}

	@MessagePattern("get_vehicle_by_id")
	getVehicleByUser(data: { id: string; userId: string }) {
		return this.vehiclesService.findVehicleByUser(data.id, data.userId);
	}

	@MessagePattern("create_vehicle")
	createVehicle(vehicleData: CreateVehicleDto) {
		return this.vehiclesService.create(vehicleData);
	}

	@MessagePattern("update_vehicle")
	updateVehicle(data: { id: string; userId: string; data: UpdateVehicleDto }) {
		return this.vehiclesService.updateForUser(data.id, data.userId, data.data);
	}

	@MessagePattern("delete_vehicle")
	deleteVehicle(data: { id: string; userId: string }) {
		return this.vehiclesService.removeForUser(data.id, data.userId);
	}
}
