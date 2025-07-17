import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from '../entities/album.entity';
import { Artist } from '../entities/artist.entity';
import { Track } from '../entities/track.entity';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Album, Artist, Track]), UserModule],
  providers: [AlbumService],
  controllers: [AlbumController],
  exports: [AlbumService],
})
export class AlbumModule {}
