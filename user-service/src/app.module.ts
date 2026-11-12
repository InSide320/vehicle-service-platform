import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module.js";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./prisma/index.js";
import { AuthenticationModule } from "@nestjs/authentication";
import { AuthModule } from "./auth/auth.module.js";
import {
	FileTemplateEngine,
	LogMailTransport,
	MailModule,
	SmtpTransport,
} from "@nestjs/mail";
import { join } from "node:path";

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: [".env"],
			isGlobal: true,
		}),
		MailModule.forRootAsync({
			useFactory: () => ({
				transport: process.env.SMTP_URL
					? new SmtpTransport({ url: process.env.SMTP_URL })
					: new LogMailTransport(),
				templates: new FileTemplateEngine({
					dir: join(import.meta.dirname, "mail/templates"),
				}),
				from: "Accounts <accounts@example.com>",
			}),
		}),
		AuthenticationModule.forRootAsync({
			useFactory: () => ({
				session: {
					absoluteTtl: "14d", // signed out after 14 days, however active
					idleTtl: "3d", // 3 days without a request
				},
				emailVerification: { url: `${process.env.APP_URL}/auth/email/verify` },
			}),
		}),
		PrismaModule,
		UsersModule,
		AuthModule,
	],
})
export class AppModule {}
