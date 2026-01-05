import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  findAll() {
    return this.repo.find();
  }

  // Lightweight DB access used for uptime/keep-alive checks.
  // Does not return user data; only performs a minimal read.
  async ping(): Promise<void> {
    await this.repo.find({ select: ['id'], take: 1 });
  }

  async findOne(id: number) {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  create(data: Partial<User>) {
    const user = this.repo.create(data);
    return this.repo.save(user);
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);

    if (attrs.password) {
      const salt = await bcrypt.genSalt();
      attrs.password = await bcrypt.hash(attrs.password, salt);
    }

    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return this.repo.remove(user);
  }

  async updateFavorites(id: number, favorites: number[]) {
    const user = await this.findOne(id);
    user.favoriteStations = favorites;
    return this.repo.save(user);
  }

  async getFavorites(userId: number): Promise<number[]> {
    const user = await this.repo.findOne({
      where: { id: userId },
      select: ['id', 'favoriteStations'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return user.favoriteStations || [];
  }

  async toggleFavorite(
    userId: number,
    stationId: number,
  ): Promise<{ favorites: number[]; added: boolean }> {
    const user = await this.findOne(userId);
    const favorites = user.favoriteStations || [];
    const index = favorites.indexOf(stationId);

    if (index === -1) {
      // Add to favorites
      favorites.push(stationId);
      user.favoriteStations = favorites;
      await this.repo.save(user);
      return { favorites, added: true };
    } else {
      // Remove from favorites
      favorites.splice(index, 1);
      user.favoriteStations = favorites;
      await this.repo.save(user);
      return { favorites, added: false };
    }
  }
}
