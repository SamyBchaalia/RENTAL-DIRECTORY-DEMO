import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { BusinessService } from './business.service';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { SearchBusinessDto } from './dto/search-business.dto';

@Controller('businesses')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Post()
  // @UseGuards(JwtAuthGuard) // Uncomment when auth is implemented
  create(@Body() createBusinessDto: CreateBusinessDto) {
    return this.businessService.create(createBusinessDto);
  }

  @Get()
  findAll(@Query() searchDto: SearchBusinessDto) {
    return this.businessService.findAll(searchDto);
  }

  @Get('stats')
  getStats() {
    return this.businessService.getStats();
  }

  @Get('categories')
  getCategories() {
    return this.businessService.getCategories();
  }

  @Get('locations')
  getLocations() {
    return this.businessService.getLocations();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.businessService.findOne(id);
  }

  @Patch(':id')
  // @UseGuards(JwtAuthGuard) // Uncomment when auth is implemented
  update(@Param('id') id: string, @Body() updateBusinessDto: UpdateBusinessDto) {
    return this.businessService.update(id, updateBusinessDto);
  }

  @Patch(':id/toggle-active')
  // @UseGuards(JwtAuthGuard) // Uncomment when auth is implemented
  @HttpCode(HttpStatus.OK)
  toggleActive(@Param('id') id: string) {
    return this.businessService.toggleActive(id);
  }

  @Patch(':id/toggle-featured')
  // @UseGuards(JwtAuthGuard) // Uncomment when auth is implemented
  @HttpCode(HttpStatus.OK)
  toggleFeatured(@Param('id') id: string) {
    return this.businessService.toggleFeatured(id);
  }

  @Delete(':id')
  // @UseGuards(JwtAuthGuard) // Uncomment when auth is implemented
  remove(@Param('id') id: string) {
    return this.businessService.remove(id);
  }
}
