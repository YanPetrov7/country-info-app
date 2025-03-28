import { Controller, Get, Param } from '@nestjs/common';
import { CountryService } from './country.service';
import { Country, CountryInfo } from './interfaces';

@Controller('countries')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  async getAvailableCountries(): Promise<Country[]> {
    return this.countryService.getAvailable();
  }

  @Get(':code')
  async getCountryInfo(
    @Param('code') countryCode: string,
  ): Promise<CountryInfo> {
    return this.countryService.getInfo(countryCode);
  }
}
