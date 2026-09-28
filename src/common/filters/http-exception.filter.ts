import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { STATUS_CODES } from 'http';
import { ErrorResponseDto } from '../dto/error-response.dto';

// Catches every exception and turns it into
// the same JSON shape (ErrorResponseDto).
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let error = 'Internal Server Error';
    let message: string[] = ['Internal server error'];

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const body = exception.getResponse();
      // Standard name of the status (401 -> "Unauthorized") unless the exception gives one.
      error = STATUS_CODES[statusCode] ?? 'Error';
      if (typeof body === 'string') {
        message = [body];
      } else {
        const b = body as { message?: string | string[]; error?: string };
        message = Array.isArray(b.message)
          ? b.message
          : [b.message ?? exception.message];
        error = b.error ?? error;
      }
    } else {
      // Unexpected error: details go to the server log,
      // never to the client.
      this.logger.error(
        exception instanceof Error ? exception.stack : String(exception),
      );
    }

    const payload: ErrorResponseDto = {
      statusCode,
      error,
      message,
      path: req.url,
      timestamp: new Date().toISOString(),
    };
    res.status(statusCode).json(payload);
  }
}
