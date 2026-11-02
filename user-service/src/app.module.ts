import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module.js";
import { ConfigModule } from "@nestjs/config";

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: [".env"],
		}),
		UsersModule,
	],
})
export class AppModule {}
