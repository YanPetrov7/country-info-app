import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Calendar } from '../../calendar/entities';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @OneToOne(() => Calendar, (calendar) => calendar.user, { cascade: true })
  calendar: Calendar;
}
