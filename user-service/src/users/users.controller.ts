import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from "@nestjs/common";
import { User } from "./user.js";
import { CreateUserDto } from "./dto/create-user.dto.js";
import { UsersService } from "./users.service.js";
import { UpdateUserEmailDto } from "./dto/update-user-email.dto.js";
import { UpdateUserPasswordDto } from "./dto/update-user-password.dto.js";

@Controller("users")
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	create(@Body() createUserDto: CreateUserDto): Promise<User> {
		return this.usersService.create(createUserDto);
	}

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
	updatePass(@Param("id") id: string, @Body() dto: UpdateUserPasswordDto) {
		return this.usersService.updatePassword(id, dto);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.usersService.remove(id);
	}
}
