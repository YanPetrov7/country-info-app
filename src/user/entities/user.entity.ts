import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    length: 50,
  })
  firstName: string;

  @Column('varchar', {
    length: 50,
  })
  lastName: string;

  @Column('varchar', {
    length: 255,
    unique: true,
  })
  email: string;
}
