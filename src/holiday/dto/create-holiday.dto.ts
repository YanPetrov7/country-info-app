import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateHolidayDto {
  @IsString()
  @IsNotEmpty()
  countryCode: string;

  @IsInt()
  @IsNotEmpty()
  year: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  eventsNames?: string[];
}
