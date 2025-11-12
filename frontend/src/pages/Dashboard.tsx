import { useState, useEffect } from 'react';
import { metricsApi, Metric, Stats, QueryParams } from '../services/api';
import MetricsChart from '../components/MetricsChart';
import MetricsList from '../components/MetricsList';
import StatsCard from '../components/StatsCard';
import ExportButtons from '../components/ExportButtons';
import FilterPanel from '../components/FilterPanel';
import './Dashboard.css';

const Dashboard = () => {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<QueryParams>({
    page: 1,
    limit: 10,
  });
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchMetrics();
    fetchStats();
  }, [filters]);

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      const response = await metricsApi.getAll(filters);
      setMetrics(response.data.data);
      setTotal(response.data.total);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch metrics');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await metricsApi.getStats(filters);
      setStats(response.data);
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this metric?')) {
      try {
        await metricsApi.delete(id);
        fetchMetrics();
        fetchStats();
      } catch (err: any) {
        alert('Failed to delete metric: ' + err.message);
      }
    }
  };

  const handleFilterChange = (newFilters: QueryParams) => {
    setFilters({ ...filters, ...newFilters, page: 1 });
  };

  const handlePageChange = (newPage: number) => {
    setFilters({ ...filters, page: newPage });
  };

  if (loading && metrics.length === 0) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Usage Metrics Dashboard</h2>
        <ExportButtons filters={filters} />
      </div>

      <FilterPanel onFilterChange={handleFilterChange} />

      {error && <div className="error-message">{error}</div>}

      {stats && (
        <div className="stats-grid">
          <StatsCard title="Total Count" value={stats.count} />
          <StatsCard title="Total Value" value={stats.total.toFixed(2)} />
          <StatsCard title="Average" value={stats.average.toFixed(2)} />
          <StatsCard title="Min" value={stats.min.toFixed(2)} />
          <StatsCard title="Max" value={stats.max.toFixed(2)} />
        </div>
      )}

      <div className="dashboard-content">
        <div className="chart-section">
          <h3>Metrics Visualization</h3>
          <MetricsChart metrics={metrics} />
        </div>

        <div className="list-section">
          <h3>Recent Metrics</h3>
          <MetricsList
            metrics={metrics}
            onDelete={handleDelete}
            currentPage={filters.page || 1}
            totalPages={Math.ceil(total / (filters.limit || 10))}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
