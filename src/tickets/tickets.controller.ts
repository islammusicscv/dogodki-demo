import { Controller, Get, Param } from '@nestjs/common';
import { TicketsService } from './tickets.service';

@Controller()
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  // Nested route: tickets of one event
  @Get('events/:eventId/tickets')
  findByEvent(@Param('eventId') eventId: number) {
    return this.ticketsService.findByEvent(eventId);
  }

  @Get('tickets/:id')
  findOne(@Param('id') id: number) {
    return this.ticketsService.findOne(id);
  }
}
