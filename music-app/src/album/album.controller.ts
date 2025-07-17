import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  Param,
  Headers,
  Delete,
  UnauthorizedException,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDTO } from './dtos/create-album.dto';
import { UserService } from '../user/user.service';
import { UserRole } from 'src/entities/user.entity';

@Controller('albums')
export class AlbumController {
  constructor(
    private readonly albumService: AlbumService,
    private readonly userService: UserService,
  ) {}

  @Get()
  async getAll(
    @Query('artistId') artistId?: number,
    @Headers('Authorization') token?: string,
  ) {
    const user = token
      ? await this.userService.findByToken(token.replace('Bearer ', '').trim())
      : null;
    const isAdmin = user?.role === UserRole.ADMIN;
    return this.albumService.getAll(artistId, isAdmin);
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.albumService.getById(id);
  }

  @Post()
  create(@Body() createAlbumDTO: CreateAlbumDTO) {
    return this.albumService.create(createAlbumDTO);
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
    return this.albumService.delete(id);
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
    return this.albumService.publish(id);
  }
}
