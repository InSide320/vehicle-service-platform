import { Length } from "class-validator";

export class CreateUserDto {
	@Length(2, 50)
	name!: string;

	@Length(2, 100)
	email!: string;

	@Length(6, 100)
	password!: string;

	createdAt?: Date;

}
