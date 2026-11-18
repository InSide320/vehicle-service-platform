import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module.js";
import { ValidationPipe } from "@nestjs/common";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

async function bootstrap() {
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(
		AppModule,
		{
			transport: Transport.RMQ,
			options: {
				urls: [process.env.RABBITMQ_URL || "amqp://localhost:5672"],
				queue:
					process.env.RABBITMQ_VEHICLE_SERVICE_QUEUE ||
					"vehicle-service-platform.vehicle-queue",
				queueOptions: {
					durable: true,
				},
			},
			logger: ["log", "error", "warn"],
		}
	);
	app.enableShutdownHooks();
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			transform: true,
		})
	);

	await app.listen();
}
await bootstrap();
