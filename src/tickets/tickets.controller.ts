import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';

@Controller()
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  // Nested route: tickets of one event
  @Get('events/:eventId/tickets')
  findByEvent(@Param('eventId', ParseIntPipe) eventId: number) {
    return this.ticketsService.findByEvent(eventId);
  }

  // Buy tickets for one event
  @Post('events/:eventId/tickets')
  purchase(@Param('eventId', ParseIntPipe) eventId: number, @Body() dto: CreateTicketDto) {
    return this.ticketsService.purchase(eventId, dto);
  }

  @Get('tickets/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ticketsService.findOne(id);
  }
}
