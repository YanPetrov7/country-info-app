import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHolidayDto } from './dto/create-holiday.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Holiday } from './entities';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';

@Injectable()
export class HolidayService {
  constructor(
    @InjectRepository(Holiday)
    private readonly holidayRepository: Repository<Holiday>,
    private readonly userService: UserService,
  ) {}

  async findAllForUser(userId: number): Promise<Holiday[]> {
    return this.holidayRepository.find({
      where: {
        User: {
          id: userId,
        },
      },
      relations: ['User'],
    });
  }

  async create(userId: number, dto: CreateHolidayDto): Promise<Holiday> {
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    const holiday = this.holidayRepository.create({
      user_id: userId,
      title: dto.title,
      date: dto.date || new Date(),
      countryCode: dto.countryCode,
    });

    return this.holidayRepository.save(holiday);
  }
}
