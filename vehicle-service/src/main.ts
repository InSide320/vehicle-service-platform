import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module.js";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

async function bootstrap() {
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(
		AppModule,
		{
			transport: Transport.TCP,
		}
	);
	await app.listen();
}
await bootstrap();
