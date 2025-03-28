import { Module } from '@nestjs/common';
import { HolidayService } from './holiday.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Holiday } from './entities';
import { HolidayController } from './holiday.controller';
import { UserModule } from '../user/user.module';
import { CountryModule } from '../country/country.module';

@Module({
  imports: [TypeOrmModule.forFeature([Holiday]), UserModule, CountryModule],
  providers: [HolidayService],
  exports: [TypeOrmModule, HolidayService],
  controllers: [HolidayController],
})
export class HolidayModule {}
