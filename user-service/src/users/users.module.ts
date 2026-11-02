import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { UsersService } from "./users.service.js";
import { UsersController } from "./users.controller.js";
import { UsersMiddleware } from "./users.middleware.js";
import { PrismaModule } from "../prisma/index.js";

@Module({
	imports: [PrismaModule],
	controllers: [UsersController],
	providers: [UsersService],
})
export class UsersModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(UsersMiddleware).forRoutes("*");
	}
}
