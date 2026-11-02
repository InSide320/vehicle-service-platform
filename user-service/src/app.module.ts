import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module.js";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./prisma/index.js";

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: [".env"],
			isGlobal: true,
		}),
		PrismaModule,
		UsersModule,
	],
})
export class AppModule {}
