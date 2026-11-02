import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { AppModule } from "./app.module.js";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const config = app.get(ConfigService);
	const port = config.get<string>("PORT") || 3000;
	await app.listen(port);
	console.log(
		`User service listening on port ${port}` +
			"\n" +
			`Link: http://localhost:${port}/`
	);
}
await bootstrap();
