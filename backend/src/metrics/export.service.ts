import { Injectable } from '@nestjs/common';
import { Metric } from './entities/metric.entity';
import PDFDocument from 'pdfkit';

@Injectable()
export class ExportService {
  async exportToCsv(metrics: Metric[]): Promise<string> {
    const headers = ['ID', 'Name', 'Type', 'Value', 'Unit', 'User ID', 'Created At'];
    const rows = metrics.map(metric => [
      metric.id,
      metric.name,
      metric.type,
      metric.value.toString(),
      metric.unit || '',
      metric.userId || '',
      metric.createdAt.toISOString(),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n');

    return csvContent;
  }

  exportToJson(metrics: Metric[]): string {
    return JSON.stringify({
      exportDate: new Date().toISOString(),
      totalRecords: metrics.length,
      metrics: metrics.map(metric => ({
        id: metric.id,
        name: metric.name,
        type: metric.type,
        value: metric.value,
        unit: metric.unit,
        metadata: metric.metadata,
        userId: metric.userId,
        createdAt: metric.createdAt,
        updatedAt: metric.updatedAt,
      })),
    }, null, 2);
  }

  async exportToPdf(metrics: Metric[]): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ margin: 50 });
      const chunks: Buffer[] = [];

      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);

      // Title
      doc.fontSize(20).text('Usage Metrics Report', { align: 'center' });
      doc.moveDown();
      doc.fontSize(12).text(`Export Date: ${new Date().toLocaleDateString()}`, { align: 'center' });
      doc.fontSize(12).text(`Total Records: ${metrics.length}`, { align: 'center' });
      doc.moveDown(2);

      // Table header
      doc.fontSize(10).font('Helvetica-Bold');
      const tableTop = doc.y;
      const colWidths = [80, 100, 80, 60, 60, 100];
      const headers = ['Name', 'Type', 'Value', 'Unit', 'User ID', 'Date'];

      let xPos = 50;
      headers.forEach((header, i) => {
        doc.text(header, xPos, tableTop, { width: colWidths[i], align: 'left' });
        xPos += colWidths[i];
      });

      doc.moveDown();
      doc.font('Helvetica');

      // Table rows
      metrics.forEach((metric, index) => {
        if (doc.y > 700) {
          doc.addPage();
        }

        const rowY = doc.y;
        xPos = 50;

        const rowData = [
          metric.name.substring(0, 15),
          metric.type.substring(0, 15),
          metric.value.toString(),
          metric.unit || '-',
          metric.userId?.substring(0, 10) || '-',
          new Date(metric.createdAt).toLocaleDateString(),
        ];

        rowData.forEach((data, i) => {
          doc.text(data, xPos, rowY, { width: colWidths[i], align: 'left' });
          xPos += colWidths[i];
        });

        doc.moveDown(0.5);
      });

      doc.end();
    });
  }
}
