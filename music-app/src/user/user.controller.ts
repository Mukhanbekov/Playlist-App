import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async register(@Body() body: { username: string; password: string }) {
    const user = await this.userService.register(body.username, body.password);
    return { message: 'User created successfully', user };
  }

  @Post('sessions')
  async login(@Body() body: { username: string; password: string }) {
    const result = await this.userService.login(body.username, body.password);
    if (!result) throw new UnauthorizedException('Неверные учетные данные');
  
    const { token, user } = result;
    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    };
  }

  @Post('logout')
  async logout(@Req() req: Request) {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];
    if (!token) throw new UnauthorizedException('No token provided');

    await this.userService.logout(token);
    return { message: 'Logged out successfully' };
  }
}
