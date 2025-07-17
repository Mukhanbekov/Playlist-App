import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Artist } from './artist.entity';
import { Track } from './track.entity';

@Entity()
export class Album {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column()
  coverImage: string;

  @Column({ default: false })
  isPublished: boolean;

  @ManyToOne(() => Artist, (artist) => artist.albums, { onDelete: 'CASCADE' })
  artist: Artist;

  @OneToMany(() => Track, (track) => track.album, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  tracks: Track[];
}
