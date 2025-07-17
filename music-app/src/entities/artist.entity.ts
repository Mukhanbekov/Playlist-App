import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Album } from './album.entity';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  photo: string;

  @Column()
  info: string;

  @Column({ default: false })
  isPublished: boolean;

  @OneToMany(() => Album, (album) => album.artist, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  albums: Album[];
}
