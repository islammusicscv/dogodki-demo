import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { FindEventsQueryDto } from './dto/find-events-query.dto';

@Injectable()
export class EventsService {
  constructor(@InjectRepository(Event) private readonly repo: Repository<Event>) {}

  // Returns [events, total]. Without page and limit: all events (as before).
  findAll(query: FindEventsQueryDto) {
    const paginated = query.page !== undefined || query.limit !== undefined;
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    return this.repo.findAndCount({
      where: query.venue ? { venue: query.venue } : {},
      // id as a tie-breaker: pages must be stable when two events start at the same time
      order: { startsAt: 'ASC', id: 'ASC' },
      skip: paginated ? (page - 1) * limit : undefined,
      take: paginated ? limit : undefined,
    });
  }

  async findOne(id: number) {
    const event = await this.repo.findOneBy({ id });
    if (!event) throw new NotFoundException(`Event ${id} not found`);
    return event;
  }

  create(dto: CreateEventDto) {
    return this.repo.save(this.repo.create(dto));
  }

  async update(id: number, dto: UpdateEventDto) {
    const event = await this.findOne(id);
    return this.repo.save(this.repo.merge(event, dto));
  }

  async remove(id: number) {
    await this.repo.remove(await this.findOne(id));
  }
}
