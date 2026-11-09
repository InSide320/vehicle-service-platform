import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class UpdateUserPasswordDto {
	@IsString()
	@IsNotEmpty()
	currentPassword!: string;

	@IsString()
	@MinLength(12)
	@MaxLength(128)
	newPassword!: string;
}

export class UpdatePasswordHashDto {
	@IsString({ message: "Must be a string" })
	@MinLength(12)
	@MaxLength(128)
	passwordHash!: string;
}
