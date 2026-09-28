import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, Res } from '@nestjs/common';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ApiErrorResponse } from '../common/swagger/api-error-response.decorator';
import { EventsService } from './events.service';
import { Event } from './event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { FindEventsQueryDto } from './dto/find-events-query.dto';

@ApiTags('events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  // GET /events                    -> all events
  // GET /events?venue=...          -> only events at this venue
  // GET /events?page=2&limit=5     -> one page; X-Total-Count = number of all matches
  @Get()
  @ApiOkResponse({ type: [Event], description: 'header X-Total-Count = število vseh zadetkov' })
  @ApiErrorResponse(HttpStatus.BAD_REQUEST, 'page must not be less than 1', '/events?page=0')
  async findAll(@Query() query: FindEventsQueryDto, @Res({ passthrough: true }) res: Response) {
    const [events, total] = await this.eventsService.findAll(query);
    res.setHeader('X-Total-Count', String(total));
    return events;
  }

  @Get(':id')
  @ApiOkResponse({ type: Event })
  @ApiErrorResponse(HttpStatus.NOT_FOUND, 'Event 999 not found', '/events/999')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.eventsService.findOne(id);
  }

  @Post()
  @ApiCreatedResponse({ type: Event })
  @ApiErrorResponse(HttpStatus.BAD_REQUEST, 'capacity must be an integer number', '/events')
  create(@Body() dto: CreateEventDto) {
    return this.eventsService.create(dto);
  }

  @Patch(':id')
  @ApiOkResponse({ type: Event })
  @ApiErrorResponse(HttpStatus.BAD_REQUEST, 'capacity must not be less than 1', '/events/2')
  @ApiErrorResponse(HttpStatus.NOT_FOUND, 'Event 999 not found', '/events/999')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateEventDto) {
    return this.eventsService.update(id, dto);
  }

  // 204 No Content: deleted, nothing to send back
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  @ApiErrorResponse(HttpStatus.NOT_FOUND, 'Event 999 not found', '/events/999')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.eventsService.remove(id);
  }
}
