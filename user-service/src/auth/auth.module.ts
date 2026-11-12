import { Module } from "@nestjs/common";
import { SessionAuth } from "./session-auth.provider.js";
import { UsersModule } from "../users/users.module.js";
import { CredentialsService } from "./credentials.service.js";
import { AuthController } from "./auth.controller.js";
import { EmailVerificationMailer } from "./email-verification.mailer.js";
import { EmailVerificationController } from "./email-verification.controller.js";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ConfigService } from "@nestjs/config";

@Module({
	imports: [
		UsersModule,
		ClientsModule.registerAsync([
			{
				name: "VEHICLE_EVENTS",
				inject: [ConfigService],
				useFactory: (config: ConfigService) => ({
					transport: Transport.RMQ,
					options: {
						urls: [config.get<string>("RABBITMQ_URL", "amqp://localhost:5672")],
						queue: config.get<string>(
							"RABBITMQ_VEHICLE_SERVICE_QUEUE",
							"vehicle_queue"
						),
						queueOptions: {
							durable: true,
						},
					},
				}),
			},
		]),
	],
	controllers: [AuthController, EmailVerificationController],
	providers: [SessionAuth, CredentialsService, EmailVerificationMailer],
})
export class AuthModule {}
