import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './ticket.entity';
import { EventsService } from '../events/events.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { generateTicketCode } from './ticket-code';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket) private readonly repo: Repository<Ticket>,
    private readonly eventsService: EventsService,
  ) {}

  async findByEvent(eventId: number) {
    await this.eventsService.findOne(eventId); // 404 if the event does not exist
    return this.repo.find({ where: { eventId }, order: { id: 'ASC' } });
  }

  async findOne(id: number) {
    const ticket = await this.repo.findOneBy({ id });
    if (!ticket) throw new NotFoundException(`Ticket ${id} not found`);
    return ticket;
  }

  async purchase(eventId: number, dto: CreateTicketDto) {
    const event = await this.eventsService.findOne(eventId); // 404 if missing
    const sold = await this.repo.sum('quantity', { eventId }) ?? 0;
    if (sold + dto.quantity > event.capacity) {
      throw new ConflictException(`Not enough seats for event ${eventId}`);
    }
    // The price comes from the database, never from the client.
    return this.repo.save(
      this.repo.create({
        eventId,
        quantity: dto.quantity,
        totalCents: dto.quantity * event.ticketPriceCents,
        createdAt: new Date().toISOString(),
        code: generateTicketCode(),
      }),
    );
  }
}
