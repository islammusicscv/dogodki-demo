import { PartialType } from '@nestjs/swagger';
import { CreateEventDto } from './create-event.dto';

// Same rules as CreateEventDto, but every property is optional (PATCH).
// PartialType from @nestjs/swagger also copies the Swagger metadata,
// so /docs shows the same fields (as optional).
export class UpdateEventDto extends PartialType(CreateEventDto) {}
