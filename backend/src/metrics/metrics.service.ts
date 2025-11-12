import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { Metric } from './entities/metric.entity';
import { CreateMetricDto } from './dto/create-metric.dto';
import { UpdateMetricDto } from './dto/update-metric.dto';
import { QueryMetricDto } from './dto/query-metric.dto';

@Injectable()
export class MetricsService {
  constructor(
    @InjectRepository(Metric)
    private metricsRepository: Repository<Metric>,
  ) {}

  async create(createMetricDto: CreateMetricDto): Promise<Metric> {
    const metric = this.metricsRepository.create(createMetricDto);
    return await this.metricsRepository.save(metric);
  }

  async findAll(queryDto: QueryMetricDto): Promise<{ data: Metric[]; total: number; page: number; limit: number }> {
    const { type, userId, startDate, endDate, page = 1, limit = 10 } = queryDto;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (type) {
      where.type = type;
    }

    if (userId) {
      where.userId = userId;
    }

    if (startDate && endDate) {
      where.createdAt = Between(new Date(startDate), new Date(endDate));
    } else if (startDate) {
      where.createdAt = MoreThanOrEqual(new Date(startDate));
    } else if (endDate) {
      where.createdAt = LessThanOrEqual(new Date(endDate));
    }

    const [data, total] = await this.metricsRepository.findAndCount({
      where,
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return {
      data,
      total,
      page,
      limit,
    };
  }

  async findOne(id: string): Promise<Metric> {
    const metric = await this.metricsRepository.findOne({ where: { id } });
    if (!metric) {
      throw new NotFoundException(`Metric with ID "${id}" not found`);
    }
    return metric;
  }

  async update(id: string, updateMetricDto: UpdateMetricDto): Promise<Metric> {
    const metric = await this.findOne(id);
    Object.assign(metric, updateMetricDto);
    return await this.metricsRepository.save(metric);
  }

  async remove(id: string): Promise<void> {
    const result = await this.metricsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Metric with ID "${id}" not found`);
    }
  }

  async getStats(queryDto: QueryMetricDto): Promise<any> {
    const { type, userId, startDate, endDate } = queryDto;

    const queryBuilder = this.metricsRepository.createQueryBuilder('metric');

    if (type) {
      queryBuilder.andWhere('metric.type = :type', { type });
    }

    if (userId) {
      queryBuilder.andWhere('metric.userId = :userId', { userId });
    }

    if (startDate && endDate) {
      queryBuilder.andWhere('metric.createdAt BETWEEN :startDate AND :endDate', {
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      });
    } else if (startDate) {
      queryBuilder.andWhere('metric.createdAt >= :startDate', { startDate: new Date(startDate) });
    } else if (endDate) {
      queryBuilder.andWhere('metric.createdAt <= :endDate', { endDate: new Date(endDate) });
    }

    const stats = await queryBuilder
      .select([
        'COUNT(*) as count',
        'SUM(metric.value) as total',
        'AVG(metric.value) as average',
        'MIN(metric.value) as min',
        'MAX(metric.value) as max',
      ])
      .getRawOne();

    return {
      count: parseInt(stats.count) || 0,
      total: parseFloat(stats.total) || 0,
      average: parseFloat(stats.average) || 0,
      min: parseFloat(stats.min) || 0,
      max: parseFloat(stats.max) || 0,
    };
  }
}
