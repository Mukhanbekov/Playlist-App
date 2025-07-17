import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from '../entities/artist.entity';
import { Album } from '../entities/album.entity';
import { Track } from '../entities/track.entity';
import { User, UserRole } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Artist) private artistRepo: Repository<Artist>,
    @InjectRepository(Album) private albumRepo: Repository<Album>,
    @InjectRepository(Track) private trackRepo: Repository<Track>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async runSeed() {
    await this.clear();
    const artist1 = this.artistRepo.create({
      name: 'Linkin Park',
      photo: 'https://linkinpark.com/logo.jpg',
      info: 'Rock band from the US',
      isPublished: true,
    });
    const artist2 = this.artistRepo.create({
      name: 'Imagine Dragons',
      photo: 'https://imaginedragons.com/logo.jpg',
      info: 'Alternative rock band',
      isPublished: true,
    });

    await this.artistRepo.save([artist1, artist2]);

    const album1 = this.albumRepo.create({
      name: 'Meteora',
      year: 2003,
      coverImage: 'https://example.com/meteora.jpg',
      artist: artist1,
      isPublished: true,
    });
    const album2 = this.albumRepo.create({
      name: 'Night Visions',
      year: 2012,
      coverImage: 'https://example.com/nightvisions.jpg',
      artist: artist2,
      isPublished: true,
    });



    
    await this.albumRepo.save([album1, album2]);

    const track1 = this.trackRepo.create({
      name: 'Numb',
      trackNumber: 1,
      duration: '3:07',
      youtubeUrl: 'https://youtube.com/watch?v=kXYiU_JCYtU',
      album: album1,
      isPublished: true,
    });

    const track2 = this.trackRepo.create({
      name: 'Radioactive',
      trackNumber: 1,
      duration: '3:06',
      youtubeUrl: 'https://youtube.com/watch?v=ktvTqknDobU',
      album: album2,
      isPublished: true,
    });

    await this.trackRepo.save([track1, track2]);

    const admin = this.userRepo.create({
      username: 'admin',
      password: await bcrypt.hash('adminpass', 10),
      role: UserRole.ADMIN,
    });

    const user = this.userRepo.create({
      username: 'user',
      password: await bcrypt.hash('userpass', 10),
      role: UserRole.USER,
    });

    await this.userRepo.save([admin, user]);

    return { message: 'База успешно засеяна' };
  }

  async clear() {
    await this.trackRepo.delete({});
    await this.albumRepo.delete({});
    await this.artistRepo.delete({});
    await this.userRepo.delete({});
  }
}
