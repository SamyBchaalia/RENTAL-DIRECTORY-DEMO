import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { BusinessService } from './business.service';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { SearchBusinessDto } from './dto/search-business.dto';

@ApiTags('businesses')
@Controller('businesses')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new business listing', description: 'Add a new rental business to the directory' })
  @ApiBody({ type: CreateBusinessDto })
  @ApiResponse({ status: 201, description: 'Business successfully created' })
  @ApiResponse({ status: 400, description: 'Bad request - validation error' })
  create(@Body() createBusinessDto: CreateBusinessDto) {
    return this.businessService.create(createBusinessDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all businesses', description: 'Retrieve all rental businesses with optional filtering, pagination, and search' })
  @ApiQuery({ name: 'query', required: false, description: 'Search term for name, description, or address' })
  @ApiQuery({ name: 'category', required: false, description: 'Filter by category' })
  @ApiQuery({ name: 'city', required: false, description: 'Filter by city' })
  @ApiQuery({ name: 'state', required: false, description: 'Filter by state' })
  @ApiQuery({ name: 'country', required: false, description: 'Filter by country' })
  @ApiQuery({ name: 'isActive', required: false, description: 'Filter by active status' })
  @ApiQuery({ name: 'isFeatured', required: false, description: 'Filter by featured status' })
  @ApiQuery({ name: 'page', required: false, description: 'Page number (default: 1)' })
  @ApiQuery({ name: 'limit', required: false, description: 'Items per page (default: 12)' })
  @ApiQuery({ name: 'sortBy', required: false, description: 'Sort field (default: createdAt)' })
  @ApiQuery({ name: 'sortOrder', required: false, enum: ['ASC', 'DESC'], description: 'Sort order (default: DESC)' })
  @ApiResponse({ status: 200, description: 'List of businesses retrieved successfully' })
  findAll(@Query() searchDto: SearchBusinessDto) {
    return this.businessService.findAll(searchDto);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get statistics', description: 'Get overall statistics including total, active, inactive, and featured businesses count' })
  @ApiResponse({ status: 200, description: 'Statistics retrieved successfully' })
  getStats() {
    return this.businessService.getStats();
  }

  @Get('categories')
  @ApiOperation({ summary: 'Get all categories', description: 'Get list of all categories with business counts' })
  @ApiResponse({ status: 200, description: 'Categories retrieved successfully' })
  getCategories() {
    return this.businessService.getCategories();
  }

  @Get('locations')
  @ApiOperation({ summary: 'Get all locations', description: 'Get list of all locations (city, state, country) with business counts' })
  @ApiResponse({ status: 200, description: 'Locations retrieved successfully' })
  getLocations() {
    return this.businessService.getLocations();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get business by ID', description: 'Retrieve a single business by its UUID' })
  @ApiParam({ name: 'id', description: 'Business UUID' })
  @ApiResponse({ status: 200, description: 'Business found' })
  @ApiResponse({ status: 404, description: 'Business not found' })
  findOne(@Param('id') id: string) {
    return this.businessService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update business', description: 'Update an existing business listing' })
  @ApiParam({ name: 'id', description: 'Business UUID' })
  @ApiBody({ type: UpdateBusinessDto })
  @ApiResponse({ status: 200, description: 'Business updated successfully' })
  @ApiResponse({ status: 404, description: 'Business not found' })
  @ApiResponse({ status: 400, description: 'Bad request - validation error' })
  update(@Param('id') id: string, @Body() updateBusinessDto: UpdateBusinessDto) {
    return this.businessService.update(id, updateBusinessDto);
  }

  @Patch(':id/toggle-active')
  @ApiOperation({ summary: 'Toggle active status', description: 'Enable or disable a business listing' })
  @ApiParam({ name: 'id', description: 'Business UUID' })
  @ApiResponse({ status: 200, description: 'Active status toggled successfully' })
  @ApiResponse({ status: 404, description: 'Business not found' })
  @HttpCode(HttpStatus.OK)
  toggleActive(@Param('id') id: string) {
    return this.businessService.toggleActive(id);
  }

  @Patch(':id/toggle-featured')
  @ApiOperation({ summary: 'Toggle featured status', description: 'Mark or unmark a business as featured' })
  @ApiParam({ name: 'id', description: 'Business UUID' })
  @ApiResponse({ status: 200, description: 'Featured status toggled successfully' })
  @ApiResponse({ status: 404, description: 'Business not found' })
  @HttpCode(HttpStatus.OK)
  toggleFeatured(@Param('id') id: string) {
    return this.businessService.toggleFeatured(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete business', description: 'Permanently delete a business listing' })
  @ApiParam({ name: 'id', description: 'Business UUID' })
  @ApiResponse({ status: 200, description: 'Business deleted successfully' })
  @ApiResponse({ status: 404, description: 'Business not found' })
  remove(@Param('id') id: string) {
    return this.businessService.remove(id);
  }
}
