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
import { UsersService } from "./users.service.js";
import { UpdateUserEmailDto } from "./dto/update-user-email.dto.js";
import { UpdateUserPasswordDto } from "./dto/update-user-password.dto.js";
import { CreateVehicleDto } from "./dto/create-vehicle.dto.js";
import { UpdateVehicleDto } from "./dto/update-vehicle.dto.js";
import { CurrentUser } from "@nestjs/authentication";
import { User } from "./user.js";

@Controller("users")
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	findAll() {
		return this.usersService.findAll();
	}

	@Get("me")
	getMe(@CurrentUser() user: User) {
		return this.usersService.findOne(user.id);
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.usersService.findOne(id);
	}

	@Patch("me/email")
	updateEmail(@CurrentUser() user: User, @Body() dto: UpdateUserEmailDto) {
		return this.usersService.updateEmail(user.id, dto.email);
	}

	@Patch("me/password")
	updatePassword(@CurrentUser() user: User, @Body() dto: UpdateUserPasswordDto) {
		return this.usersService.updatePassword(user.id, dto);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.usersService.remove(id);
	}

	@Get("me/vehicles")
	getVehiclesByUser(@CurrentUser() user: User) {
		return this.usersService.getVehicles(user.id);
	}

	@Get("me/vehicles/:vehicleId")
	getVehicleByUser(
		@CurrentUser() user: User,
		@Param("vehicleId", new ParseUUIDPipe({ version: "all" })) vehicleId: string
	) {
		return this.usersService.getVehicleByUser(vehicleId, user.id);
	}

	@Post("me/vehicles")
	createVehicle(@CurrentUser() user: User, @Body() dto: CreateVehicleDto) {
		return this.usersService.createVehicleForUser(user.id, dto);
	}

	@Patch("me/vehicles/:vehicleId")
	updateVehicle(
		@CurrentUser() user: User,
		@Param("vehicleId", new ParseUUIDPipe({ version: "all" }))
		vehicleId: string,
		@Body() dto: UpdateVehicleDto
	) {
		return this.usersService.updateVehicleForUser(user.id, vehicleId, dto);
	}

	@Delete("me/vehicles/:vehicleId")
	removeVehicle(
		@CurrentUser() user: User,
		@Param("vehicleId", new ParseUUIDPipe({ version: "all" })) vehicleId: string
	) {
		return this.usersService.removeVehicleForUser(user.id, vehicleId);
	}
}
