import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class SignUpDto {
	@IsEmail()
	email!: string;

	@IsString()
	@MinLength(12)
	@MaxLength(128)
	password!: string;
}

export class SignInDto {
	@IsEmail()
	email!: string;

	@IsString()
	password!: string;
}
