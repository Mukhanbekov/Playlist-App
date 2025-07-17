import {
  Controller,
  Post,
  Get,
  Headers,
  UnauthorizedException,
  Body,
} from '@nestjs/common';
import { TrackHistoryService } from './track-history.service';
import { UserService } from '../user/user.service';

@Controller('track_history')
export class TrackHistoryController {
  constructor(
    private readonly trackHistoryService: TrackHistoryService,
    private readonly userService: UserService,
  ) {}
  @Post()
  async addTrackHistory(
    @Headers('Authorization') token: string,
    @Body() body: { trackId: number },
  ) {
    console.log('Запрос на добавление трека:', body.trackId);

    if (!token) throw new UnauthorizedException('Токен не передан');
    const extractedToken = token.replace('Bearer ', '').trim();
    const user = await this.userService.findByToken(extractedToken);
    if (!user) throw new UnauthorizedException('Неверный токен');

    const history = await this.trackHistoryService.addTrackHistory(
      user,
      body.trackId,
    );
    return { message: 'Трек добавлен в историю', history };
  }

  @Get()
  async getTrackHistory(@Headers('Authorization') token: string) {
    console.log('Запрос на получение истории треков');

    if (!token) throw new UnauthorizedException('Токен не передан');
    const extractedToken = token.replace('Bearer ', '').trim();
    const user = await this.userService.findByToken(extractedToken);
    if (!user) throw new UnauthorizedException('Неверный токен');

    return this.trackHistoryService.getHistory(user);
  }
}
