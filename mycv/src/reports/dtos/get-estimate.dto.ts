import { Transform } from 'class-transformer';
import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class GetEstimateDTO {
  @IsString()
  make: string;

  @IsString()
  model: string;

  @Transform(({ value }) => {
    return parseInt(value);
  })
  @IsNumber()
  @Min(1930)
  @Max(2050)
  year: number;

  @Transform(({ value }) => {
    return parseInt(value);
  })
  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;

  @Transform(({ value }) => {
    return parseFloat(value);
  })
  @IsLongitude()
  lng: number;

  @Transform(({ value }) => {
    return parseFloat(value);
  })
  @IsLatitude()
  lat: number;
}
