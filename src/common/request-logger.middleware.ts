import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as winston from 'winston';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
    private readonly logger = winston.createLogger({
        level: 'info',
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json()
        ),
        transports: [
            new winston.transports.Console(),
            new winston.transports.File({ filename: 'logs/access.log' }), 
        ],
    });

    use(req: Request, res: Response, next: NextFunction) {
        const { method, originalUrl, headers, body } = req;
        const start = Date.now();

        res.on('finish', () => {
            const { statusCode } = res;
            const duration = Date.now() - start;

            this.logger.info({
                timestamp: new Date().toISOString(),
                method,
                url: originalUrl,
                statusCode,
                duration: `${duration}ms`,
                headers,
                body,
            });
        });

        next();
    }
}
