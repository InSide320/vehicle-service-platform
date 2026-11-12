import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { VehiclesService } from "./vehicles.service.js";
import { VehiclesController } from "./vehicles.controller.js";
import { VehiclesMiddleware } from "./vehicles.middleware.js";
import { PrismaModule } from "../prisma/index.js";

@Module({
	imports: [PrismaModule],
	controllers: [VehiclesController],
	providers: [VehiclesService],
})
export class VehiclesModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(VehiclesMiddleware).forRoutes("*");
	}
}
