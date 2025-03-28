import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateHolidayDto } from './dto/create-holiday.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Holiday } from './entities';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { CountryService } from '../country/country.service';

@Injectable()
export class HolidayService {
  private readonly logger = new Logger(HolidayService.name);

  constructor(
    @InjectRepository(Holiday)
    private readonly holidayRepository: Repository<Holiday>,
    private readonly userService: UserService,
    private readonly countryService: CountryService,
  ) {}

  async findAllForUser(userId: number): Promise<Holiday[]> {
    return this.holidayRepository.find({
      where: {
        userId,
      },
      relations: ['user'],
    });
  }

  async create(userId: number, dto: CreateHolidayDto): Promise<Holiday> {
    try {
      const user = await this.userService.findOne(userId);
      if (!user) {
        throw new NotFoundException(`User with id ${userId} not found`);
      }

      const countryEvents = await this.countryService.getCountryEvents(
        dto.countryCode,
        dto.year,
      );

      if (!Array.isArray(countryEvents)) {
        throw new BadRequestException('Failed to fetch country events');
      }

      const filteredCountryEvents = dto.eventsNames?.length
        ? countryEvents.filter((h) => dto.eventsNames.includes(h.name))
        : countryEvents;

      const eventsNames = filteredCountryEvents.map((event) => event.name);

      const holiday = this.holidayRepository.create({
        countryCode: dto.countryCode,
        year: dto.year,
        eventsNames,
        userId: user.id,
      });

      return this.holidayRepository.save(holiday);
    } catch (e) {
      this.logger.error('Error creating holiday', e);
      throw new BadRequestException('Error creating holiday', e.message);
    }
  }
}
