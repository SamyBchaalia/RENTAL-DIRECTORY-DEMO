import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetricsService } from './metrics.service';
import { MetricsController } from './metrics.controller';
import { ExportService } from './export.service';
import { Metric } from './entities/metric.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Metric])],
  controllers: [MetricsController],
  providers: [MetricsService, ExportService],
  exports: [MetricsService],
})
export class MetricsModule {}
