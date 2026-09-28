import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { EventsService } from './events.service';
import { Event } from './event.entity';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  // GET /events            -> all events
  // GET /events?venue=...  -> only events at this venue
  @Get()
  findAll(@Query('venue') venue?: string) {
    return this.eventsService.findAll(venue);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.eventsService.findOne(id);
  }

  @Post()
  create(@Body() body: Partial<Event>) {
    return this.eventsService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() body: Partial<Event>) {
    return this.eventsService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.eventsService.remove(id);
  }
}
