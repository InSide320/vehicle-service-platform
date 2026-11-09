import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { AppModule } from "./app.module.js";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger: ["error", "warn", "log"],
	});
	app.enableShutdownHooks();
	app.useSecurityHeaders();
	app.useGlobalPipes(new ValidationPipe());
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
