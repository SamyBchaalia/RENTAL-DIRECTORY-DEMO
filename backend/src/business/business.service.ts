import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike, FindOptionsWhere } from 'typeorm';
import { Business } from './entities/business.entity';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { SearchBusinessDto } from './dto/search-business.dto';

@Injectable()
export class BusinessService {
  constructor(
    @InjectRepository(Business)
    private businessRepository: Repository<Business>,
  ) {}

  async create(createBusinessDto: CreateBusinessDto): Promise<Business> {
    const business = this.businessRepository.create(createBusinessDto);
    return await this.businessRepository.save(business);
  }

  async findAll(searchDto: SearchBusinessDto): Promise<{ data: Business[]; total: number; page: number; limit: number }> {
    const { query, category, city, state, country, isActive, isFeatured, page = 1, limit = 12, sortBy = 'createdAt', sortOrder = 'DESC' } = searchDto;

    const skip = (page - 1) * limit;
    const where: FindOptionsWhere<Business> = {};

    // Filter by active status (default to true for public view)
    if (isActive !== undefined) {
      where.isActive = isActive;
    }

    if (isFeatured !== undefined) {
      where.isFeatured = isFeatured;
    }

    if (category) {
      where.category = category;
    }

    if (city) {
      where.city = ILike(`%${city}%`);
    }

    if (state) {
      where.state = ILike(`%${state}%`);
    }

    if (country) {
      where.country = ILike(`%${country}%`);
    }

    let queryBuilder = this.businessRepository.createQueryBuilder('business');

    // Apply where conditions
    Object.keys(where).forEach((key) => {
      if (where[key] !== undefined) {
        if (typeof where[key] === 'object' && where[key].value) {
          // Handle ILike
          queryBuilder = queryBuilder.andWhere(`business.${key} ILIKE :${key}`, { [key]: where[key].value });
        } else {
          queryBuilder = queryBuilder.andWhere(`business.${key} = :${key}`, { [key]: where[key] });
        }
      }
    });

    // Full-text search
    if (query) {
      queryBuilder = queryBuilder.andWhere(
        '(business.name ILIKE :query OR business.description ILIKE :query OR business.address ILIKE :query)',
        { query: `%${query}%` }
      );
    }

    // Sorting
    queryBuilder = queryBuilder
      .orderBy(`business.${sortBy}`, sortOrder)
      .skip(skip)
      .take(limit);

    const [data, total] = await queryBuilder.getManyAndCount();

    return {
      data,
      total,
      page,
      limit,
    };
  }

  async findOne(id: string): Promise<Business> {
    const business = await this.businessRepository.findOne({ where: { id } });
    if (!business) {
      throw new NotFoundException(`Business with ID "${id}" not found`);
    }
    return business;
  }

  async findBySlug(name: string): Promise<Business> {
    const business = await this.businessRepository.findOne({
      where: { name: ILike(`%${name}%`) },
    });
    if (!business) {
      throw new NotFoundException(`Business "${name}" not found`);
    }
    return business;
  }

  async update(id: string, updateBusinessDto: UpdateBusinessDto): Promise<Business> {
    const business = await this.findOne(id);
    Object.assign(business, updateBusinessDto);
    return await this.businessRepository.save(business);
  }

  async remove(id: string): Promise<void> {
    const result = await this.businessRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Business with ID "${id}" not found`);
    }
  }

  async toggleActive(id: string): Promise<Business> {
    const business = await this.findOne(id);
    business.isActive = !business.isActive;
    return await this.businessRepository.save(business);
  }

  async toggleFeatured(id: string): Promise<Business> {
    const business = await this.findOne(id);
    business.isFeatured = !business.isFeatured;
    return await this.businessRepository.save(business);
  }

  async getCategories(): Promise<{ category: string; count: number }[]> {
    const result = await this.businessRepository
      .createQueryBuilder('business')
      .select('business.category', 'category')
      .addSelect('COUNT(*)', 'count')
      .where('business.isActive = :isActive', { isActive: true })
      .groupBy('business.category')
      .orderBy('count', 'DESC')
      .getRawMany();

    return result.map((r) => ({
      category: r.category,
      count: parseInt(r.count),
    }));
  }

  async getLocations(): Promise<{ city: string; state: string; country: string; count: number }[]> {
    const result = await this.businessRepository
      .createQueryBuilder('business')
      .select('business.city', 'city')
      .addSelect('business.state', 'state')
      .addSelect('business.country', 'country')
      .addSelect('COUNT(*)', 'count')
      .where('business.isActive = :isActive', { isActive: true })
      .groupBy('business.city, business.state, business.country')
      .orderBy('count', 'DESC')
      .limit(50)
      .getRawMany();

    return result.map((r) => ({
      city: r.city,
      state: r.state,
      country: r.country,
      count: parseInt(r.count),
    }));
  }

  async getStats(): Promise<any> {
    const total = await this.businessRepository.count();
    const active = await this.businessRepository.count({ where: { isActive: true } });
    const featured = await this.businessRepository.count({ where: { isFeatured: true } });
    const byCategory = await this.getCategories();

    return {
      total,
      active,
      inactive: total - active,
      featured,
      byCategory,
    };
  }
}
