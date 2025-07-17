import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from '../entities/artist.entity';
import { CreateArtistDTO } from './dtos/create-artist.dto';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}

  async getAll(isAdmin = false) {
    if (isAdmin) {
      return this.artistRepository.find();
    }
    return this.artistRepository.find({ where: { isPublished: true } });
  }

  async create(createArtistDTO: CreateArtistDTO) {
    const artist = this.artistRepository.create(createArtistDTO);
    return this.artistRepository.save(artist);
  }

  async delete(id: number) {
    return this.artistRepository.delete(id);
  }

  async publish(id: number) {
    await this.artistRepository.update(id, { isPublished: true });
    return { message: 'Исполнитель опубликован' };
  }
}
