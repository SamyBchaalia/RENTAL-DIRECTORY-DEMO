import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Metric } from '../services/api';
import { format } from 'date-fns';
import { useState } from 'react';
import './MetricsChart.css';

interface MetricsChartProps {
  metrics: Metric[];
}

const MetricsChart = ({ metrics }: MetricsChartProps) => {
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');

  const chartData = metrics
    .slice()
    .reverse()
    .map((metric) => ({
      name: format(new Date(metric.createdAt), 'MMM dd HH:mm'),
      value: Number(metric.value),
      type: metric.type,
    }));

  if (metrics.length === 0) {
    return (
      <div className="chart-empty">
        No data available for visualization
      </div>
    );
  }

  return (
    <div className="metrics-chart">
      <div className="chart-controls">
        <button
          className={`chart-btn ${chartType === 'line' ? 'active' : ''}`}
          onClick={() => setChartType('line')}
        >
          Line Chart
        </button>
        <button
          className={`chart-btn ${chartType === 'bar' ? 'active' : ''}`}
          onClick={() => setChartType('bar')}
        >
          Bar Chart
        </button>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        {chartType === 'line' ? (
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#3498db" strokeWidth={2} />
          </LineChart>
        ) : (
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#3498db" />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default MetricsChart;
