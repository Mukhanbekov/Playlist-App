import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Album } from './album.entity';

@Entity()
export class Track {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  youtubeUrl: string;

  @Column({ nullable: true })
  duration?: string;

  @Column()
  trackNumber: number;

  @Column({ default: false })
  isPublished: boolean;

  @ManyToOne(() => Album, (album) => album.tracks, { onDelete: 'CASCADE' })
  album: Album;
}
