import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    console.log(`Se ejecuto el controlador con el metodo ${req.method}
      en la ruta ${req.url} a las ${new Date().toLocaleTimeString()}`);
    next();
  }
}

export function globalLogger(req: Request, res: Response, next: () => void) {
  console.log(`Se ejecuto el controlador con el metodo ${req.method} en la ruta ${req.url} a las ${new Date().toLocaleTimeString()}`);
  next();
}
