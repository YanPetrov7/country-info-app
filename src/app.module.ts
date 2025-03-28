import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HolidayModule } from './holiday/holiday.module';
import { CountryModule } from './country/country.module';
import { CalendarEventModule } from './calendar-event/calendar-event.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [HolidayModule, CountryModule, CalendarEventModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
