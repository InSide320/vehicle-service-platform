import { Public, SignInService } from "@nestjs/authentication";
import {
	Body,
	Controller,
	HttpCode,
	Post,
	UnauthorizedException,
} from "@nestjs/common";
import { CredentialsService } from "./credentials.service.js";
import { SignInDto, SignUpDto } from "./dto/auth.dto.js";
import { signInSchema, signUpSchema } from "./auth.schemas.js";

@Public()
@Controller("auth")
export class AuthController {
	constructor(
		private readonly credentialsService: CredentialsService,
		private readonly signInService: SignInService
	) {}
	@Post("sign-up")
	async signUp(@Body({ schema: signUpSchema }) body: SignUpDto) {
		const user = await this.credentialsService.register(
			body.email,
			body.password
		);
		await this.signInService.signIn(user.id, { method: "password" });
		return user;
	}

	@Post("sign-in")
	@HttpCode(200)
	async signIn(@Body({ schema: signInSchema }) body: SignInDto) {
		const user = await this.credentialsService.verify(
			body.email,
			body.password
		);
		if (!user) {
			throw new UnauthorizedException("Invalid credentials");
		}
		const { session } = await this.signInService.signIn(user.id, {
			method: "password",
		});
		return { mfaRequired: session.mfa === "pending" };
	}
}
