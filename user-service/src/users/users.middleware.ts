import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class UsersMiddleware implements NestMiddleware {
	use(req: Request, res: Response, next: NextFunction) {
		console.log(
			`USERS: Request:  ${req.method} ${req.originalUrl} Status Code: ${res.statusCode}`
		);
		next();
	}
}
