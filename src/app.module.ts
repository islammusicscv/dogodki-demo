import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsModule } from './events/events.module';
import { TicketsModule } from './tickets/tickets.module';
import { HealthController } from './health/health.controller';
import { SeedService } from './seed/seed.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: process.env.DB_PATH ?? 'dogodki.db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    EventsModule,
    TicketsModule,
  ],
  controllers: [HealthController],
  providers: [SeedService],
})
export class AppModule {}
