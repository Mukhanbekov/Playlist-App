import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async isAdmin(token: string): Promise<boolean> {
    const user = await this.findByToken(token);
    return user?.role === UserRole.ADMIN;
  }

  async register(username: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      username,
      password: hashedPassword,
      role: UserRole.USER, 
    });
    return this.userRepository.save(user);
  }

  async login(
    username: string,
    password: string,
  ): Promise<{ token: string; user: User } | null> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = uuidv4();
      user.token = token;
      await this.userRepository.save(user);
      return { token, user };
    }
    return null;
  }

  async logout(token: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { token } });
    if (user) {
      user.token = null;
      await this.userRepository.save(user);
    }
  }

  async findByToken(token: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { token } });
  }
}
