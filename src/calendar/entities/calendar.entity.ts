import { Entity, PrimaryGeneratedColumn, OneToOne, OneToMany } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { CalendarEvent } from './calendar-event.entity';

@Entity()
export class Calendar {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.calendar)
  user: User;

  @OneToMany(() => CalendarEvent, (event) => event.calendar, {
    cascade: true,
  })
  events: CalendarEvent[];
}
