import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, FindOptionsWhere } from 'typeorm';
import { Track } from '../entities/track.entity';
import { Album } from '../entities/album.entity';
import { CreateTrackDTO } from './dtos/create-track.dto';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
  ) {}

  async getAll(
    albumId?: number,
    artistId?: number,
    isAdmin = false,
  ): Promise<Track[]> {
    const where: FindOptionsWhere<Track> = {};

    if (!isAdmin) {
      where.isPublished = true;
    }

    if (albumId) {
      where.album = { id: albumId };
    } else if (artistId) {
      const albums = await this.albumRepository.find({
        where: { artist: { id: artistId } },
      });
      const albumIds = albums.map((album) => album.id);
      where.album = {
        id: In(albumIds),
      } as FindOptionsWhere<Album>;
    }

    return this.trackRepository.find({
      where,
      relations: ['album', 'album.artist'],
      order: { trackNumber: 'ASC' },
    });
  }

  async create(
    createTrackDTO: CreateTrackDTO,
    albumId: number,
  ): Promise<Track> {
    const album = await this.albumRepository.findOneBy({ id: albumId });
    if (!album) throw new Error('Album not found');

    const existingTrack = await this.trackRepository.findOne({
      where: {
        album: { id: albumId },
        trackNumber: createTrackDTO.trackNumber,
      },
    });
    if (existingTrack) {
      throw new Error('Track number must be unique within an album');
    }

    const track = this.trackRepository.create({ ...createTrackDTO, album });
    return this.trackRepository.save(track);
  }

  async delete(id: number) {
    return this.trackRepository.delete(id);
  }

  async publish(id: number) {
    await this.trackRepository.update(id, { isPublished: true });
    return { message: 'Трек опубликован' };
  }
}
