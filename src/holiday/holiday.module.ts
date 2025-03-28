import { Module } from '@nestjs/common';
import { HolidayService } from './holiday.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Holiday } from './entities';
import { HolidayController } from './holiday.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Holiday]), UserModule],
  providers: [HolidayService],
  exports: [TypeOrmModule, HolidayService],
  controllers: [HolidayController],
})
export class HolidayModule {}
