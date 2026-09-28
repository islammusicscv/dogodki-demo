import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
  constructor(@InjectRepository(Event) private readonly repo: Repository<Event>) {}

  findAll(venue?: string) {
    return this.repo.find({
      where: venue ? { venue } : {},
      order: { startsAt: 'ASC' },
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
