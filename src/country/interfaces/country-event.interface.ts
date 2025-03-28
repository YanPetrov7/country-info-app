export interface CountryEvent {
  name: string;
  date: string;
  localName: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  counties: string[] | null;
  types: string[];
}
