import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './ticket.entity';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { EventsModule } from '../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket]), EventsModule],
  controllers: [TicketsController],
  providers: [TicketsService],
})
export class TicketsModule {}
