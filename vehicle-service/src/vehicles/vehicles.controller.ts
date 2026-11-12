import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseUUIDPipe,
	Patch,
	Post,
} from "@nestjs/common";
import { VehiclesService } from "./vehicles.service.js";
import { CreateVehicleDto } from "./dto/create-vehicle.dto.js";
import { UpdateVehicleDto } from "./dto/update-vehicle.dto.js";
import { EventPattern, MessagePattern, Payload } from "@nestjs/microservices";

@Controller("vehicles")
export class VehiclesController {
	constructor(private readonly vehiclesService: VehiclesService) {}

	@Post()
	create(@Body() createVehicleDto: CreateVehicleDto) {
		return this.vehiclesService.create(createVehicleDto);
	}

	@EventPattern("USER_CREATED")
	handleUserCreatedEvent(
		@Payload()
		event: {
			type: "USER_CREATED";
			data: { id: string; email: string };
		}
	) {
		return this.vehiclesService.createForNewUser(event.data.id);
	}

	@Get()
	findAll() {
		return this.vehiclesService.findAll();
	}

	@MessagePattern("get_vehicles")
	getVehiclesByUser(data: {userId: string}) {
		return this.vehiclesService.findAllForUser(data.userId);
	}

	@Get(":id")
	findOne(@Param("id", new ParseUUIDPipe({ version: "all" })) id: string) {
		return this.vehiclesService.findOne(id);
	}

	@Patch(":id")
	update(
		@Param("id", new ParseUUIDPipe({ version: "all" })) id: string,
		@Body() updateVehicleDto: UpdateVehicleDto
	) {
		return this.vehiclesService.update(id, updateVehicleDto);
	}

	@Delete(":id")
	remove(@Param("id", new ParseUUIDPipe({ version: "all" })) id: string) {
		return this.vehiclesService.remove(id);
	}
}
