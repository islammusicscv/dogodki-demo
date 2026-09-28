import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './event.entity';

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

  create(data: Partial<Event>) {
    return this.repo.save(this.repo.create(data));
  }

  async update(id: number, data: Partial<Event>) {
    const event = await this.findOne(id);
    return this.repo.save(this.repo.merge(event, data));
  }

  async remove(id: number) {
    await this.repo.remove(await this.findOne(id));
  }
}
