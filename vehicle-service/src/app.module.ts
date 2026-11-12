import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { VehiclesModule } from "./vehicles/vehicles.module.js";
import { PrismaModule } from "./prisma/index.js";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: [".env"],
		}),
		PrismaModule,
		VehiclesModule,
	],
})
export class AppModule {}
