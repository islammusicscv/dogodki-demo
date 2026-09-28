import { IsInt, IsISO8601, IsNotEmpty, IsString, Length, Max, Min } from 'class-validator';
import { IsInFuture } from '../../common/validators/is-in-future.validator';

// What a client may send when creating an event.
// id is not here: the database assigns it.
export class CreateEventDto {
  @IsString()
  @Length(3, 120)
  title: string;

  @IsString()
  @IsNotEmpty()
  venue: string;

  @IsISO8601()
  @IsInFuture()
  startsAt: string;

  @IsInt()
  @Min(1)
  @Max(50000)
  capacity: number;

  @IsInt()
  @Min(0)
  ticketPriceCents: number;
}
