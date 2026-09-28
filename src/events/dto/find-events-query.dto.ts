import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

// GET /events?venue=...&page=...&limit=...
export class FindEventsQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({ example: 'Kino Šiška, Ljubljana' })
  @IsOptional()
  @IsString()
  venue?: string;
}
