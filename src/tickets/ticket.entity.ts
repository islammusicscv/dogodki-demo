import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ticket {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 1 })
  @Column()
  eventId: number;

  @ApiProperty({ example: 2 })
  @Column()
  quantity: number;

  // Price at the time of purchase, in cents
  @ApiProperty({ example: 3600, description: 'cena v centih, izračuna strežnik' })
  @Column()
  totalCents: number;

  @ApiProperty({ example: '2026-10-01T09:30:00.000Z' })
  @Column()
  createdAt: string;

  // Entry code: whoever knows it, gets in. Only the buyer may see it.
  // Serialized only when a handler asks for the 'owner' group.
  @ApiPropertyOptional({ example: 'DG-7F3A91C2', description: 'samo v odgovoru na nakup' })
  @Expose({ groups: ['owner'] })
  @Column({ unique: true })
  code: string;
}
