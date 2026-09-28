import { PartialType } from '@nestjs/mapped-types';
import { CreateEventDto } from './create-event.dto';

// Same rules as CreateEventDto, but every property is optional (PATCH).
export class UpdateEventDto extends PartialType(CreateEventDto) {}
