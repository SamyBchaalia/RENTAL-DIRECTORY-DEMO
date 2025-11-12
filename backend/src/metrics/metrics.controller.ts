import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { MetricsService } from './metrics.service';
import { ExportService } from './export.service';
import { CreateMetricDto } from './dto/create-metric.dto';
import { UpdateMetricDto } from './dto/update-metric.dto';
import { QueryMetricDto } from './dto/query-metric.dto';

@Controller('metrics')
export class MetricsController {
  constructor(
    private readonly metricsService: MetricsService,
    private readonly exportService: ExportService,
  ) {}

  @Post()
  create(@Body() createMetricDto: CreateMetricDto) {
    return this.metricsService.create(createMetricDto);
  }

  @Get()
  findAll(@Query() queryDto: QueryMetricDto) {
    return this.metricsService.findAll(queryDto);
  }

  @Get('stats')
  getStats(@Query() queryDto: QueryMetricDto) {
    return this.metricsService.getStats(queryDto);
  }

  @Get('export/csv')
  async exportCsv(@Query() queryDto: QueryMetricDto, @Res() res: Response) {
    const { data } = await this.metricsService.findAll({ ...queryDto, limit: 10000 });
    const csv = await this.exportService.exportToCsv(data);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=metrics.csv');
    res.status(HttpStatus.OK).send(csv);
  }

  @Get('export/json')
  async exportJson(@Query() queryDto: QueryMetricDto, @Res() res: Response) {
    const { data } = await this.metricsService.findAll({ ...queryDto, limit: 10000 });
    const json = this.exportService.exportToJson(data);

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename=metrics.json');
    res.status(HttpStatus.OK).send(json);
  }

  @Get('export/pdf')
  async exportPdf(@Query() queryDto: QueryMetricDto, @Res() res: Response) {
    const { data } = await this.metricsService.findAll({ ...queryDto, limit: 10000 });
    const pdfBuffer = await this.exportService.exportToPdf(data);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=metrics.pdf');
    res.status(HttpStatus.OK).send(pdfBuffer);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.metricsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMetricDto: UpdateMetricDto) {
    return this.metricsService.update(id, updateMetricDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.metricsService.remove(id);
  }
}
