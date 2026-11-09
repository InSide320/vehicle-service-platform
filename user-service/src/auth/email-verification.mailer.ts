import { Mailable, Mailer } from "@nestjs/mail";
import {
	AuthenticationRegistry,
	EmailVerificationHandler,
	EmailVerificationLink,
} from "@nestjs/authentication";
import { Injectable } from "@nestjs/common";
import { UsersRepository } from "../users/users.repository.js";

@Injectable()
export class VerifyEmailMail implements Mailable<EmailVerificationLink> {
	render({ url }: EmailVerificationLink) {
		return {
			subject: "Confirm your email address",
			template: "verify-email",
			context: {
				url,
			},
		};
	}
}

@Injectable()
export class EmailVerificationMailer extends EmailVerificationHandler {
	constructor(
		private readonly usersRepository: UsersRepository,
		private readonly mailer: Mailer,
		registry: AuthenticationRegistry
	) {
		super();
		registry.registerHandler("emailVerification", this);
	}
	async send(link: EmailVerificationLink) {
		await this.mailer.send(VerifyEmailMail, { to: link.email, data: link });
	}

	markVerified(userId: string, email: string) {
		return this.usersRepository.markEmailVerifies(userId, email);
	}
}
