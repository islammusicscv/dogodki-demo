import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './ticket.entity';
import { EventsService } from '../events/events.service';

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
}
