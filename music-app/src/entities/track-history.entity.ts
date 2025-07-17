import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Track } from './track.entity';

@Entity('track_history')
export class TrackHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.trackHistory, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Track, { eager: false, onDelete: 'CASCADE' })
  track: Track;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  datetime: Date;
}
