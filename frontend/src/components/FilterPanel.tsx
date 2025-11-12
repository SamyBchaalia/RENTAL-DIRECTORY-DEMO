import { useState } from 'react';
import { QueryParams } from '../services/api';
import './FilterPanel.css';

interface FilterPanelProps {
  onFilterChange: (filters: QueryParams) => void;
}

const FilterPanel = ({ onFilterChange }: FilterPanelProps) => {
  const [filters, setFilters] = useState<QueryParams>({});
  const [isExpanded, setIsExpanded] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value || undefined,
    }));
  };

  const handleApply = () => {
    onFilterChange(filters);
  };

  const handleReset = () => {
    setFilters({});
    onFilterChange({});
  };

  return (
    <div className="filter-panel">
      <button
        className="filter-toggle"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? 'Hide Filters' : 'Show Filters'}
      </button>

      {isExpanded && (
        <div className="filter-content">
          <div className="filter-grid">
            <div className="filter-field">
              <label htmlFor="type">Type</label>
              <select
                id="type"
                name="type"
                value={filters.type || ''}
                onChange={handleChange}
              >
                <option value="">All Types</option>
                <option value="api_call">API Call</option>
                <option value="page_view">Page View</option>
                <option value="user_action">User Action</option>
                <option value="performance">Performance</option>
                <option value="error">Error</option>
                <option value="custom">Custom</option>
              </select>
            </div>

            <div className="filter-field">
              <label htmlFor="userId">User ID</label>
              <input
                type="text"
                id="userId"
                name="userId"
                value={filters.userId || ''}
                onChange={handleChange}
                placeholder="Filter by user ID"
              />
            </div>

            <div className="filter-field">
              <label htmlFor="startDate">Start Date</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={filters.startDate || ''}
                onChange={handleChange}
              />
            </div>

            <div className="filter-field">
              <label htmlFor="endDate">End Date</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={filters.endDate || ''}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="filter-actions">
            <button onClick={handleReset} className="btn-reset">
              Reset
            </button>
            <button onClick={handleApply} className="btn-apply">
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
