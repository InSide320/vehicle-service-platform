import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto.js";
import { IsEmail } from "class-validator";

export class UpdateUserEmailDto extends PartialType(CreateUserDto) {
	@IsEmail()
	email!: string;
}
