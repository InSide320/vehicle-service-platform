import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { UsersController } from "./users.controller.js";
import { UsersMiddleware } from "./users.middleware.js";
import { PrismaModule } from "../prisma/index.js";
import { UsersRepository } from "./users.repository.js";
import { UsersService } from "./users.service.js";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ConfigService } from "@nestjs/config";

@Module({
	imports: [
		PrismaModule,
		ClientsModule.registerAsync([
			{
				name: "VEHICLE_SERVICE",
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
	controllers: [UsersController],
	providers: [UsersRepository, UsersService],
	exports: [UsersRepository],
})
export class UsersModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(UsersMiddleware).forRoutes("*");
	}
}
