import {
	IsInt,
	IsOptional,
	IsString,
	IsUUID,
	Max,
	Min,
	MinLength,
} from "class-validator";

export class CreateVehicleDto {
	@IsString()
	@MinLength(1)
	make!: string;

	@IsString()
	@MinLength(1)
	model!: string;

	@IsOptional()
	@IsInt()
	@Min(1886)
	@Max(new Date().getFullYear() + 1)
	year?: number | null;
	@IsUUID()
	userId!: string;
}
