import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { readFileSync } from 'fs';
import { Event } from '../events/event.entity';
import { Ticket } from '../tickets/ticket.entity';

// Fills an empty database from seed.json on startup.
// For a fresh start delete dogodki.db and start the app again.
@Injectable()
export class SeedService implements OnApplicationBootstrap {
  constructor(private readonly dataSource: DataSource) {}

  async onApplicationBootstrap() {
    if ((await this.dataSource.getRepository(Event).count()) > 0) return;
    const seed = JSON.parse(readFileSync('seed.json', 'utf8'));
    await this.dataSource.getRepository(Event).insert(seed.events);
    await this.dataSource.getRepository(Ticket).insert(seed.tickets);
  }
}
