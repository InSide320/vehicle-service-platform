import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class VehiclesMiddleware implements NestMiddleware {
	use(req: Request, res: Response, next: NextFunction) {
		console.log(
			`VehiclesMiddleware: ${req.method} ${req.originalUrl} Status Code: ${res.statusCode}`
		);
		next();
	}
}
