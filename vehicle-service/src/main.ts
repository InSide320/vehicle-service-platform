import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module.js";
import { ConfigService } from "@nestjs/config";
import { ValidationPipe } from "@nestjs/common";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger: ["error", "warn", "log"],
	});
	app.enableShutdownHooks();
	app.useSecurityHeaders();
	app.useGlobalPipes(new ValidationPipe());
	const config = app.get(ConfigService);
	const port = config.get<string>("PORT") || 3001;

	app.connectMicroservice<MicroserviceOptions>({
		transport: Transport.RMQ,
		options: {
			urls: [config.get<string>("RABBITMQ_URL", "amqp://localhost:5672")],
			queue: config.get<string>(
				"RABBITMQ_VEHICLE_SERVICE_QUEUE",
				"vehicle-service-platform.vehicle-queue"
			),
			queueOptions: {
				durable: true,
			},
		},
	});
	await app.startAllMicroservices();
	await app.listen(port);
	console.log(
		`Vehicle service listening on port ${port}` +
			"\n" +
			`Link: http://localhost:${port}/`
	);
}
await bootstrap();
