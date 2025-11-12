import { Metric } from '../services/api';
import { format } from 'date-fns';
import './MetricsList.css';

interface MetricsListProps {
  metrics: Metric[];
  onDelete: (id: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const MetricsList = ({ metrics, onDelete, currentPage, totalPages, onPageChange }: MetricsListProps) => {
  return (
    <div className="metrics-list">
      {metrics.length === 0 ? (
        <div className="empty-state">No metrics found. Add some metrics to get started!</div>
      ) : (
        <>
          <div className="table-container">
            <table className="metrics-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Value</th>
                  <th>Unit</th>
                  <th>User ID</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {metrics.map((metric) => (
                  <tr key={metric.id}>
                    <td>{metric.name}</td>
                    <td>
                      <span className={`type-badge type-${metric.type}`}>
                        {metric.type}
                      </span>
                    </td>
                    <td>{metric.value}</td>
                    <td>{metric.unit || '-'}</td>
                    <td>{metric.userId || '-'}</td>
                    <td>{format(new Date(metric.createdAt), 'MMM dd, yyyy HH:mm')}</td>
                    <td>
                      <button
                        onClick={() => onDelete(metric.id)}
                        className="btn-delete"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="pagination-btn"
              >
                Previous
              </button>
              <span className="pagination-info">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="pagination-btn"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MetricsList;
