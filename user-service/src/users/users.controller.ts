import { Body, Controller, Delete, Get, Param, Patch } from "@nestjs/common";
import { UsersService } from "./users.service.js";
import { UpdateUserEmailDto } from "./dto/update-user-email.dto.js";
import { UpdateUserPasswordDto } from "./dto/update-user-password.dto.js";

@Controller("users")
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	findAll() {
		return this.usersService.findAll();
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.usersService.findOne(id);
	}

	@Patch(":id/email")
	updateEmail(@Param("id") id: string, @Body() dto: UpdateUserEmailDto) {
		return this.usersService.updateEmail(id, dto.email);
	}

	@Patch(":id/password")
	updatePassword(@Param("id") id: string, @Body() dto: UpdateUserPasswordDto) {
		return this.usersService.updatePassword(id, dto);
	}

	@Get(":id/vehicles")
	async getVehicles(@Param("id") id: string) {
		return await this.usersService.getVehicles(id);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.usersService.remove(id);
	}
}
