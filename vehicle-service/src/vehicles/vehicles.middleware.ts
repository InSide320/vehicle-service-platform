import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class VehiclesMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
		console.log(`VehiclesMiddleware: ${req.method} ${req.originalUrl}`);
    next();
  }
}
