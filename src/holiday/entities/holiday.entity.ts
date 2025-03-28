import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/entities';

@Entity()
export class Holiday {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 2,
  })
  countryCode: string;

  @Column({
    type: 'integer',
    unsigned: true,
  })
  year: number;

  @Column('simple-array')
  eventsNames: string[];

  @Column({ type: 'integer', name: 'user_id' })
  userId: number;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
