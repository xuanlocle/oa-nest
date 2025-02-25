import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppLogger } from '../logger.service';

@Catch(HttpException)
export class HttpErrorFilter implements ExceptionFilter {
    private readonly logger = new Logger(HttpErrorFilter.name);

    constructor(private readonly appLogger: AppLogger) { }

    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        const errorResponse = {
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            method: request.method,
            message: exception.message || 'Internal Server Error',
        };

        // Log the error using Winston
        this.appLogger.error(`${status} Error - ${exception.message} [${request.method}] ${request.url}`);

        response.status(status).json(errorResponse);
    }
}
