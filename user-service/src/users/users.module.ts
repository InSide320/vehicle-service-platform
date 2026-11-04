import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { UsersController } from "./users.controller.js";
import { UsersMiddleware } from "./users.middleware.js";
import { PrismaModule } from "../prisma/index.js";
import { UsersRepository } from "./users.repository.js";
import { UsersService } from "./users.service.js";

@Module({
	imports: [PrismaModule],
	controllers: [UsersController],
	providers: [UsersRepository, UsersService],
	exports: [UsersRepository],
})
export class UsersModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(UsersMiddleware).forRoutes("*");
	}
}
