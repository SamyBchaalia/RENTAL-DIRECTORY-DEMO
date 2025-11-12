import { IsString, IsNumber, IsOptional, IsObject, MaxLength, Min } from 'class-validator';

export class CreateMetricDto {
  @IsString()
  @MaxLength(255)
  name: string;

  @IsString()
  @MaxLength(100)
  type: string;

  @IsNumber()
  @Min(0)
  value: number;

  @IsString()
  @MaxLength(50)
  @IsOptional()
  unit?: string;

  @IsObject()
  @IsOptional()
  metadata?: Record<string, any>;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  userId?: string;
}
