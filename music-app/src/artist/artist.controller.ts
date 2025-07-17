import {
  Controller,
  Get,
  Post,
  Body,
  Headers,
  Delete,
  Param,
  UnauthorizedException,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDTO } from './dtos/create-artist.dto';
import { UserService } from '../user/user.service';
import { UserRole } from 'src/entities/user.entity';

@Controller('artists')
export class ArtistController {
  constructor(
    private readonly artistService: ArtistService,
    private readonly userService: UserService,
  ) {}

  @Get()
  async getAll(@Headers('Authorization') token?: string) {
    const user = token
      ? await this.userService.findByToken(token.replace('Bearer ', '').trim())
      : null;
    const isAdmin = user?.role === UserRole.ADMIN;
    return this.artistService.getAll(isAdmin);
  }

  @Post()
  create(@Body() createArtistDTO: CreateArtistDTO) {
    return this.artistService.create(createArtistDTO);
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
    return this.artistService.delete(id);
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
    return this.artistService.publish(id);
  }
}
