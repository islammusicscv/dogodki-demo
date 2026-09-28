import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Event {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Jazz večer' })
  @Column()
  title: string;

  @ApiProperty({ example: 'Kino Šiška, Ljubljana' })
  @Column()
  venue: string;

  // ISO 8601 in UTC, e.g. "2026-11-12T19:00:00.000Z"
  @ApiProperty({ example: '2026-11-12T18:00:00.000Z' })
  @Column()
  startsAt: string;

  @ApiProperty({ example: 300 })
  @Column()
  capacity: number;

  // Money is stored in cents (integer): 1800 = 18,00 EUR
  @ApiProperty({ example: 1800, description: 'cena v centih' })
  @Column()
  ticketPriceCents: number;
}
