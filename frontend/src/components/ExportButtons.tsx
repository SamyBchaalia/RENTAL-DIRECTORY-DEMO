import { metricsApi, QueryParams } from '../services/api';
import './ExportButtons.css';

interface ExportButtonsProps {
  filters?: QueryParams;
}

const ExportButtons = ({ filters }: ExportButtonsProps) => {
  const handleExport = async (format: 'csv' | 'json' | 'pdf') => {
    try {
      let response;
      let filename;
      let mimeType;

      switch (format) {
        case 'csv':
          response = await metricsApi.exportCsv(filters);
          filename = 'metrics.csv';
          mimeType = 'text/csv';
          break;
        case 'json':
          response = await metricsApi.exportJson(filters);
          filename = 'metrics.json';
          mimeType = 'application/json';
          break;
        case 'pdf':
          response = await metricsApi.exportPdf(filters);
          filename = 'metrics.pdf';
          mimeType = 'application/pdf';
          break;
      }

      // Create a blob from the response data
      const blob = new Blob([response.data], { type: mimeType });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error: any) {
      alert('Failed to export: ' + (error.message || 'Unknown error'));
    }
  };

  return (
    <div className="export-buttons">
      <span className="export-label">Export:</span>
      <button onClick={() => handleExport('csv')} className="export-btn">
        CSV
      </button>
      <button onClick={() => handleExport('json')} className="export-btn">
        JSON
      </button>
      <button onClick={() => handleExport('pdf')} className="export-btn">
        PDF
      </button>
    </div>
  );
};

export default ExportButtons;
