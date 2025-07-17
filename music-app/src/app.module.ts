import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { TrackModule } from './track/track.module';
import { UserModule } from './user/user.module';
import { TrackHistoryModule } from './track-history/track-history.module';
import { Artist } from './entities/artist.entity';
import { Album } from './entities/album.entity';
import { Track } from './entities/track.entity';
import { User } from './entities/user.entity';
import { TrackHistory } from './entities/track-history.entity';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Yezgodddd9667',
      database: 'mymusic_db',
      entities: [Artist, Album, Track, User, TrackHistory],
      synchronize: true,
    }),
    SeedModule,
    ArtistModule,
    AlbumModule,
    TrackModule,
    UserModule,
    TrackHistoryModule,
  ],
})
export class AppModule {}
