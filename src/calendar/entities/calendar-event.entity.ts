import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Calendar } from './calendar.entity';

@Entity()
export class CalendarEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ nullable: true })
  countryCode?: string;

  @ManyToOne(() => Calendar, (calendar) => calendar.events, {
    onDelete: 'CASCADE',
  })
  calendar: Calendar;
}
