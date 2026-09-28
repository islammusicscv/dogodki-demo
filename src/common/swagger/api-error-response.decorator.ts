import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ErrorResponseDto } from '../dto/error-response.dto';

// Documents one error response with the shared shape AND a matching example,
// so /docs does not show "statusCode: 400" as the example for a 404.
export function ApiErrorResponse(status: HttpStatus, message: string, path: string, description?: string) {
  return applyDecorators(
    ApiResponse({
      status,
      description,
      type: ErrorResponseDto,
      example: {
        statusCode: status,
        error: ERROR_NAMES[status] ?? 'Error',
        message: [message],
        path,
        timestamp: '2026-11-12T18:00:00.000Z',
      },
    }),
  );
}

const ERROR_NAMES: Partial<Record<HttpStatus, string>> = {
  [HttpStatus.BAD_REQUEST]: 'Bad Request',
  [HttpStatus.NOT_FOUND]: 'Not Found',
  [HttpStatus.CONFLICT]: 'Conflict',
};
