import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { Country, CountryEvent, CountryInfo, Population } from './interfaces';

@Injectable()
export class CountryService {
  private readonly logger = new Logger(CountryService.name);
  private readonly nagerApiUrl: string;
  private readonly countriesNowApiUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.nagerApiUrl = this.configService.get('NAGER_API_URL');
    this.countriesNowApiUrl = this.configService.get('COUNTRIES_NOW_API_URL');
  }

  async getAvailable(): Promise<Country[]> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get(`${this.nagerApiUrl}/AvailableCountries`),
      );
      return data;
    } catch (e) {
      this.logger.error('Error fetching available countries', e);
      throw new BadRequestException('Error fetching available countries');
    }
  }

  async getCountryEvents(
    countryCode: string,
    year: number,
  ): Promise<CountryEvent[]> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get(
          `${this.nagerApiUrl}/PublicHolidays/${year}/${countryCode}`,
        ),
      );
      return data;
    } catch (e) {
      this.logger.error(
        `Error fetching countryEvents for country ${countryCode} in year ${year}: ${e.message}`,
      );
      throw new BadRequestException(
        `Error fetching countryEvents for country ${countryCode} in year ${year}`,
      );
    }
  }

  async getInfo(countryCode: string): Promise<CountryInfo> {
    const [borders, flag, population] = await Promise.all([
      this.getCountryBorders(countryCode),
      this.getCountryFlag(countryCode),
      this.getCountryPopulation(countryCode),
    ]);

    return { countryCode, borders, flag, population };
  }

  private async getCountryPopulation(
    countryCode: string,
  ): Promise<Population[]> {
    try {
      // Get country name from Nager API (doesn't work with ISO3 for some reason)
      const { data: countryData } = await firstValueFrom(
        this.httpService.get(`${this.nagerApiUrl}/CountryInfo/${countryCode}`),
      );

      const { data: populationData } = await firstValueFrom(
        this.httpService.post(
          `${this.countriesNowApiUrl}/countries/population`,
          {
            country: countryData.commonName,
          },
        ),
      );

      // Get only the latest population count
      return populationData.data.populationCounts.slice(-1);
    } catch (e) {
      this.logger.error(
        `Error fetching population for country ${countryCode}: ${e.message}`,
      );

      return [];
    }
  }

  private async getCountryBorders(countryCode: string): Promise<string[]> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get(`${this.nagerApiUrl}/CountryInfo/${countryCode}`),
      );

      return data.borders.map((border) => border.commonName) || [];
    } catch (e) {
      this.logger.error(
        `Error fetching borders for country ${countryCode}: ${e.message}`,
      );

      return [];
    }
  }

  private async getCountryFlag(countryCode: string): Promise<string | null> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get(
          `${this.countriesNowApiUrl}/countries/flag/images`,
        ),
      );
      return data.data.find((c) => c.iso2 === countryCode)?.flag || null;
    } catch (e) {
      this.logger.error(
        `Error fetching flag for country ${countryCode}: ${e.message}`,
      );

      return null;
    }
  }
}
