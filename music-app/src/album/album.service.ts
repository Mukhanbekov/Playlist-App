import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from '../entities/album.entity';
import { Artist } from '../entities/artist.entity';
import { Track } from '../entities/track.entity';
import { CreateAlbumDTO } from './dtos/create-album.dto';
import { FindOptionsWhere } from 'typeorm';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
  ) {}

  async getAll(artistId?: number, isAdmin = false): Promise<Album[]> {
    const where: FindOptionsWhere<Album> = {};

    if (artistId) {
      where.artist = { id: artistId } as Artist;
    }

    if (!isAdmin) {
      where.isPublished = true;
    }

    const albums = await this.albumRepository.find({
      where,
      relations: ['artist'],
      order: { year: 'ASC' },
    });
    const albumsWithTrackCount = await Promise.all(
      albums.map(async (album) => {
        const trackCount = await this.trackRepository.count({
          where: { album: { id: album.id } },
        });
        return { ...album, trackCount };
      }),
    );

    return albumsWithTrackCount;
  }

  async getById(id: number): Promise<Album | null> {
    const album = await this.albumRepository.findOne({
      where: { id },
      relations: ['artist'],
    });

    if (!album) {
      throw new Error(`Album with ID ${id} not found`);
    }

    return album;
  }

  async create(createAlbumDTO: CreateAlbumDTO): Promise<Album> {
    const artist = await this.artistRepository.findOneBy({
      id: createAlbumDTO.artistId,
    });
    if (!artist) throw new Error('Artist not found');

    const album = this.albumRepository.create({
      ...createAlbumDTO,
      artist,
    });
    return this.albumRepository.save(album);
  }

  async delete(id: number) {
    return this.albumRepository.delete(id);
  }

  async publish(id: number) {
    await this.albumRepository.update(id, { isPublished: true });
    return { message: 'Альбом опубликован' };
  }
}
