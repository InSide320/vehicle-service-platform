import { Module } from "@nestjs/common";
import { SessionAuth } from "./session-auth.provider.js";
import { UsersModule } from "../users/users.module.js";
import { CredentialsService } from "./credentials.service.js";
import { AuthController } from "./auth.controller.js";

@Module({
	imports: [UsersModule],
	controllers: [AuthController],
	providers: [SessionAuth, CredentialsService],
})
export class AuthModule {}
