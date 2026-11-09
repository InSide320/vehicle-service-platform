import {
	CurrentUser,
	EmailVerificationService,
	Public,
} from "@nestjs/authentication";
import {
	BadRequestException,
	Body,
	ConflictException,
	Controller,
	HttpCode,
	Post,
} from "@nestjs/common";
import { User } from "../users/user.js";

@Controller("auth/email")
export class EmailVerificationController {
	constructor(
		private readonly emailVerificationService: EmailVerificationService
	) {}

	@Public()
	@Post("verify")
	@HttpCode(200)
	async verify(@Body("token") token: string) {
		const verified = await this.emailVerificationService.verify(token);
		if (!verified) {
			throw new BadRequestException("Invalid or expired verification token");
		}
		return {
			email: verified.email,
			emailVerified: true,
		};
	}

	@Post("verification")
	@HttpCode(202)
	async resend(@CurrentUser() user: User) {
		if (user.emailVerified) {
			throw new ConflictException("Email address already verified");
		}
		await this.emailVerificationService.send(user);
	}
}
