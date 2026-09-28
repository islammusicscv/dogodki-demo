import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, SerializeOptions } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ApiErrorResponse } from '../common/swagger/api-error-response.decorator';
import { TicketsService } from './tickets.service';
import { Ticket } from './ticket.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';

@ApiTags('tickets')
@Controller()
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  // Nested route: tickets of one event (without entry codes)
  @Get('events/:eventId/tickets')
  @ApiOkResponse({ type: [Ticket] })
  @ApiErrorResponse(HttpStatus.NOT_FOUND, 'Event 999 not found', '/events/999/tickets')
  findByEvent(@Param('eventId', ParseIntPipe) eventId: number) {
    return this.ticketsService.findByEvent(eventId);
  }

  // Buy tickets for one event. The buyer is the only one who sees the code.
  @Post('events/:eventId/tickets')
  @SerializeOptions({ groups: ['owner'] })
  @ApiCreatedResponse({ type: Ticket })
  @ApiErrorResponse(HttpStatus.BAD_REQUEST, 'quantity must not be greater than 10', '/events/1/tickets')
  @ApiErrorResponse(HttpStatus.NOT_FOUND, 'Event 999 not found', '/events/999/tickets')
  @ApiErrorResponse(HttpStatus.CONFLICT, 'Not enough seats for event 1', '/events/1/tickets', 'ni dovolj prostih mest')
  purchase(@Param('eventId', ParseIntPipe) eventId: number, @Body() dto: CreateTicketDto) {
    return this.ticketsService.purchase(eventId, dto);
  }

  @Get('tickets/:id')
  @ApiOkResponse({ type: Ticket })
  @ApiErrorResponse(HttpStatus.NOT_FOUND, 'Ticket 999 not found', '/tickets/999')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ticketsService.findOne(id);
  }
}
