import { Controller, Post, Param, Body, Get } from '@nestjs/common';
import { HolidayService } from './holiday.service';
import { CreateHolidayDto } from './dto/create-holiday.dto';

@Controller('users/:userId/calendar/holidays')
export class HolidayController {
  constructor(private readonly holidayService: HolidayService) {}

  @Get()
  async findAllHolidays(@Param('userId') userId: number) {
    return this.holidayService.findAllForUser(userId);
  }

  @Post()
  async createHoliday(
    @Param('userId') userId: number,
    @Body() dto: CreateHolidayDto,
  ) {
    return this.holidayService.create(userId, dto);
  }
}
