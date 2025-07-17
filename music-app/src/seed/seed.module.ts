import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from '../entities/artist.entity';
import { Album } from '../entities/album.entity';
import { Track } from '../entities/track.entity';
import { User } from '../entities/user.entity';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { UserService } from '../user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Artist, Album, Track, User])],
  controllers: [SeedController],
  providers: [SeedService, UserService],
})
export class SeedModule {}
