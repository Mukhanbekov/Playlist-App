import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  Param,
  BadRequestException,
  Delete,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDTO } from './dtos/create-track.dto';
import { UserService } from '../user/user.service';
import { UserRole } from 'src/entities/user.entity';

@Controller('tracks')
export class TrackController {
  constructor(
    private readonly trackService: TrackService,
    private readonly userService: UserService,
  ) {}

  @Get()
  async getAll(
    @Query('albumId') albumId?: number,
    @Query('artistId') artistId?: number,
    @Headers('Authorization') token?: string,
  ) {
    const user = token
      ? await this.userService.findByToken(token.replace('Bearer ', '').trim())
      : null;
    const isAdmin = user?.role === UserRole.ADMIN;
    return this.trackService.getAll(albumId, artistId, isAdmin);
  }

  @Post(':albumId')
  async createTrack(
    @Body() createTrackDto: CreateTrackDTO,
    @Param('albumId') albumId: number,
  ) {
    if (!createTrackDto.youtubeUrl) {
      throw new BadRequestException('YouTube URL должен быть указан.');
    }

    return this.trackService.create(
      {
        ...createTrackDto,
      },
      albumId,
    );
  }

  @Delete(':id')
  async delete(
    @Param('id') id: number,
    @Headers('Authorization') token: string,
  ) {
    const user = await this.userService.findByToken(
      token.replace('Bearer ', '').trim(),
    );
    if (user?.role !== UserRole.ADMIN)
      throw new UnauthorizedException('Только для администраторов');
    return this.trackService.delete(id);
  }

  @Post(':id/publish')
  async publish(
    @Param('id') id: number,
    @Headers('Authorization') token: string,
  ) {
    const user = await this.userService.findByToken(
      token.replace('Bearer ', '').trim(),
    );
    if (user?.role !== UserRole.ADMIN)
      throw new UnauthorizedException('Только для администраторов');
    return this.trackService.publish(id);
  }
}
