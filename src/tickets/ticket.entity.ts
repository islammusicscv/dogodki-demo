import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  eventId: number;

  @Column()
  quantity: number;

  // Price at the time of purchase, in cents
  @Column()
  totalCents: number;

  @Column()
  createdAt: string;
}
