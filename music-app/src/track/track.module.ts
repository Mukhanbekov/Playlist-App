import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from '../entities/track.entity';
import { Album } from '../entities/album.entity';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Track, Album]), UserModule],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
