import { Population } from './population.interface';

export interface CountryInfo {
  countryCode: string;
  borders: string[];
  population: Population[];
  flag: string;
}
