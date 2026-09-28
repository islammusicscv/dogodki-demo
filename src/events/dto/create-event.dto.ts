import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsISO8601, IsNotEmpty, IsString, Length, Max, Min } from 'class-validator';
import { IsInFuture } from '../../common/validators/is-in-future.validator';

// What a client may send when creating an event.
// id is not here: the database assigns it.
export class CreateEventDto {
  @ApiProperty({ example: 'Večer poezije', minLength: 3, maxLength: 120 })
  @IsString()
  @Length(3, 120)
  title: string;

  @ApiProperty({ example: 'Knjižnica Otona Župančiča, Ljubljana' })
  @IsString()
  @IsNotEmpty()
  venue: string;

  @ApiProperty({ example: '2030-04-10T17:00:00.000Z', description: 'ISO 8601, v prihodnosti' })
  @IsISO8601()
  @IsInFuture()
  startsAt: string;

  @ApiProperty({ example: 80, minimum: 1, maximum: 50000 })
  @IsInt()
  @Min(1)
  @Max(50000)
  capacity: number;

  @ApiProperty({ example: 0, minimum: 0, description: 'cena v centih' })
  @IsInt()
  @Min(0)
  ticketPriceCents: number;
}
