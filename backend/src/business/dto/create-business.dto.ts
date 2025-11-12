import {
  IsString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsBoolean,
  IsArray,
  IsNumber,
  MaxLength,
  MinLength,
  IsUrl,
  Min,
  Max,
  ValidateNested,
  IsObject
} from 'class-validator';
import { Type } from 'class-transformer';
import { BusinessCategory } from '../entities/business.entity';

export class OperatingHoursDto {
  @IsOptional()
  @IsString()
  monday?: string;

  @IsOptional()
  @IsString()
  tuesday?: string;

  @IsOptional()
  @IsString()
  wednesday?: string;

  @IsOptional()
  @IsString()
  thursday?: string;

  @IsOptional()
  @IsString()
  friday?: string;

  @IsOptional()
  @IsString()
  saturday?: string;

  @IsOptional()
  @IsString()
  sunday?: string;
}

export class CreateBusinessDto {
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  name: string;

  @IsString()
  @MinLength(10)
  description: string;

  @IsEnum(BusinessCategory)
  category: BusinessCategory;

  @IsOptional()
  @IsUrl()
  @MaxLength(255)
  website?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;

  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsString()
  @MinLength(5)
  address: string;

  @IsString()
  @MinLength(2)
  @MaxLength(100)
  city: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  state?: string;

  @IsString()
  @MinLength(2)
  @MaxLength(100)
  country: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  zipCode?: string;

  @IsOptional()
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude?: number;

  @IsOptional()
  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  rentalItems?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  amenities?: string[];

  @IsOptional()
  @IsArray()
  @IsUrl({}, { each: true })
  images?: string[];

  @IsOptional()
  @IsUrl()
  logo?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => OperatingHoursDto)
  operatingHours?: OperatingHoursDto;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  rating?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  reviewCount?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}
