import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module.js";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./prisma/index.js";
import { AuthenticationModule } from "@nestjs/authentication";
import { AuthModule } from "./auth/auth.module.js";

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: [".env"],
			isGlobal: true,
		}),
		AuthenticationModule.forRoot({
			session: {
				absoluteTtl: "14d", // signed out after 14 days, however active
				idleTtl: "3d", // 3 days without a request
			},
		}),
		PrismaModule,
		UsersModule,
		AuthModule,
	],
})
export class AppModule {}
