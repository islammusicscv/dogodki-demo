import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Max, Min } from 'class-validator';

// A purchase: the client says only HOW MANY tickets.
// Price, event and time are decided by the server.
export class CreateTicketDto {
  @ApiProperty({ example: 2, minimum: 1, maximum: 10 })
  @IsInt()
  @Min(1)
  @Max(10)
  quantity: number;
}
