import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { readFileSync } from 'fs';
import { relativeDate } from './relative-date';
import { Event } from '../events/event.entity';
import { Ticket } from '../tickets/ticket.entity';
import { generateTicketCode } from '../tickets/ticket-code';

// Fills an empty database from seed.json on startup.
// For a fresh start: npm run reset (deletes dogodki.db), then start the app again.
@Injectable()
export class SeedService implements OnApplicationBootstrap {
  constructor(private readonly dataSource: DataSource) {}

  async onApplicationBootstrap() {
    if ((await this.dataSource.getRepository(Event).count()) > 0) return;
    const seed = JSON.parse(readFileSync('seed.json', 'utf8'));
    const events = seed.events.map(
      ({ startsInDays, time, ...e }: { id: number; startsInDays: number; time: string }) => ({
        ...e,
        startsAt: relativeDate(startsInDays, time),
      }),
    );
    await this.dataSource.getRepository(Event).insert(events);
    // Entry codes are secret, so they are not in seed.json
    // (the repository is public): generate them on startup.
    const tickets = seed.tickets.map(
      ({ boughtDaysAgo, time, ...t }: { boughtDaysAgo: number; time: string }) => ({
        ...t,
        createdAt: relativeDate(-boughtDaysAgo, time),
        code: generateTicketCode(),
      }),
    );
    await this.dataSource.getRepository(Ticket).insert(tickets);
  }
}
