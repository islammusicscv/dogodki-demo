import { ApiProperty } from '@nestjs/swagger';

// The one shape of every error response in this API.
export class ErrorResponseDto {
  @ApiProperty({ example: 400 })
  statusCode: number;

  @ApiProperty({ example: 'Bad Request' })
  error: string;

  // Always an array, even for a single message, so a client handles one shape.
  @ApiProperty({ example: ['capacity must be an integer number'] })
  message: string[];

  @ApiProperty({ example: '/events' })
  path: string;

  @ApiProperty({ example: '2026-11-12T18:00:00.000Z' })
  timestamp: string;
}
