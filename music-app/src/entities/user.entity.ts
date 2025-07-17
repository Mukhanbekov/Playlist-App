import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TrackHistory } from './track-history.entity';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true, type: 'varchar' })
  token: string | null;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @OneToMany(() => TrackHistory, (history) => history.user)
  trackHistory: TrackHistory[];
}
