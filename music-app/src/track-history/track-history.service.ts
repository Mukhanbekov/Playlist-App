import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrackHistory } from '../entities/track-history.entity';
import { User } from '../entities/user.entity';
import { Track } from '../entities/track.entity';

@Injectable()
export class TrackHistoryService {
  constructor(
    @InjectRepository(TrackHistory)
    private readonly trackHistoryRepository: Repository<TrackHistory>,
  ) {}

  async addTrackHistory(user: User, trackId: number): Promise<TrackHistory> {
    const history = this.trackHistoryRepository.create({
      user,
      track: { id: trackId } as Track, 
    });
    return this.trackHistoryRepository.save(history);
  }
  async getHistory(user: User): Promise<TrackHistory[]> {
    return this.trackHistoryRepository.find({
      where: { user: { id: user.id } },
      relations: ['track', 'track.album', 'track.album.artist'],
      order: { datetime: 'DESC' },
    });
  }
}
