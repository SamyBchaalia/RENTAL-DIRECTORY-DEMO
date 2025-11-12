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
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BusinessCategory } from '../entities/business.entity';

export class OperatingHoursDto {
  @ApiPropertyOptional({ example: '9:00 AM - 6:00 PM' })
  @IsOptional()
  @IsString()
  monday?: string;

  @ApiPropertyOptional({ example: '9:00 AM - 6:00 PM' })
  @IsOptional()
  @IsString()
  tuesday?: string;

  @ApiPropertyOptional({ example: '9:00 AM - 6:00 PM' })
  @IsOptional()
  @IsString()
  wednesday?: string;

  @ApiPropertyOptional({ example: '9:00 AM - 6:00 PM' })
  @IsOptional()
  @IsString()
  thursday?: string;

  @ApiPropertyOptional({ example: '9:00 AM - 6:00 PM' })
  @IsOptional()
  @IsString()
  friday?: string;

  @ApiPropertyOptional({ example: '9:00 AM - 6:00 PM' })
  @IsOptional()
  @IsString()
  saturday?: string;

  @ApiPropertyOptional({ example: 'Closed' })
  @IsOptional()
  @IsString()
  sunday?: string;
}

export class CreateBusinessDto {
  @ApiProperty({ example: 'Premium Car Rentals', description: 'Business name' })
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  name: string;

  @ApiProperty({ example: 'Luxury car rental service offering premium vehicles for business and leisure', description: 'Detailed business description' })
  @IsString()
  @MinLength(10)
  description: string;

  @ApiProperty({ enum: BusinessCategory, example: BusinessCategory.VEHICLES, description: 'Business category' })
  @IsEnum(BusinessCategory)
  category: BusinessCategory;

  @ApiPropertyOptional({ example: 'https://premiumcarrentals.com', description: 'Business website URL' })
  @IsOptional()
  @IsUrl()
  @MaxLength(255)
  website?: string;

  @ApiPropertyOptional({ example: '+1-555-0101', description: 'Contact phone number' })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;

  @ApiProperty({ example: 'contact@premiumcarrentals.com', description: 'Contact email address' })
  @IsEmail()
  @MaxLength(255)
  email: string;

  @ApiProperty({ example: '123 Main Street', description: 'Street address' })
  @IsString()
  @MinLength(5)
  address: string;

  @ApiProperty({ example: 'New York', description: 'City name' })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  city: string;

  @ApiPropertyOptional({ example: 'NY', description: 'State or province' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  state?: string;

  @ApiProperty({ example: 'United States', description: 'Country name' })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  country: string;

  @ApiPropertyOptional({ example: '10001', description: 'Postal/ZIP code' })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  zipCode?: string;

  @ApiPropertyOptional({ example: 40.7128, description: 'GPS latitude coordinate', minimum: -90, maximum: 90 })
  @IsOptional()
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude?: number;

  @ApiPropertyOptional({ example: -74.0060, description: 'GPS longitude coordinate', minimum: -180, maximum: 180 })
  @IsOptional()
  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude?: number;

  @ApiPropertyOptional({ type: [String], example: ['Luxury Sedans', 'SUVs', 'Sports Cars'], description: 'List of items available for rent' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  rentalItems?: string[];

  @ApiPropertyOptional({ type: [String], example: ['GPS Navigation', 'Insurance', '24/7 Support'], description: 'Business amenities and features' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  amenities?: string[];

  @ApiPropertyOptional({ type: [String], example: ['https://example.com/image1.jpg'], description: 'Array of image URLs' })
  @IsOptional()
  @IsArray()
  @IsUrl({}, { each: true })
  images?: string[];

  @ApiPropertyOptional({ example: 'https://example.com/logo.png', description: 'Business logo URL' })
  @IsOptional()
  @IsUrl()
  logo?: string;

  @ApiPropertyOptional({ type: OperatingHoursDto, description: 'Business operating hours' })
  @IsOptional()
  @ValidateNested()
  @Type(() => OperatingHoursDto)
  operatingHours?: OperatingHoursDto;

  @ApiPropertyOptional({ example: 4.8, description: 'Average rating (0-5)', minimum: 0, maximum: 5 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  rating?: number;

  @ApiPropertyOptional({ example: 245, description: 'Number of reviews', minimum: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  reviewCount?: number;

  @ApiPropertyOptional({ example: true, description: 'Whether the business is active', default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({ example: false, description: 'Whether the business is featured', default: false })
  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  @ApiPropertyOptional({ example: { specialOffers: true }, description: 'Additional metadata' })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}
