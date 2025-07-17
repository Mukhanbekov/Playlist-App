import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackHistory } from '../entities/track-history.entity';
import { User } from '../entities/user.entity';
import { TrackHistoryController } from './track-history.controller';
import { TrackHistoryService } from './track-history.service';
import { UserService } from '../user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([TrackHistory, User])],
  controllers: [TrackHistoryController],
  providers: [TrackHistoryService, UserService],
})
export class TrackHistoryModule {}
