import { PartialType } from "@nestjs/mapped-types";
import { CreateVehicleDto } from "./create-vehicle.dto.js";
import { IsInt } from "class-validator";

export class UpdateVehicleDto extends PartialType(CreateVehicleDto) {
	@IsInt()
	id!: number;
}
