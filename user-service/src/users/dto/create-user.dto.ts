import {
	IsEmail,
	IsNotEmpty,
	IsString,
	MaxLength,
	MinLength,
} from "class-validator";

export class CreateUserDto {
	@IsEmail()
	@IsNotEmpty({ message: "Must not be empty" })
	@MinLength(4, { message: "Must be at least 4 characters long" })
	email!: string;

	@IsString({ message: "Must be a string" })
	@MinLength(12)
	@MaxLength(128)
	password!: string;
}


export class CreateUserHashDto {
	@IsEmail()
	@IsNotEmpty({ message: "Must not be empty" })
	@MinLength(4, { message: "Must be at least 4 characters long" })
	email!: string;

	@IsString({ message: "Must be a string" })
	@MinLength(12)
	@MaxLength(128)
	passwordHash!: string;
}
