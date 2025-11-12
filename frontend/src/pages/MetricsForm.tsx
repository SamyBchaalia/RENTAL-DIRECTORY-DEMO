import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { metricsApi, CreateMetricDto } from '../services/api';
import './MetricsForm.css';

const MetricsForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CreateMetricDto>({
    name: '',
    type: 'api_call',
    value: 0,
    unit: '',
    userId: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await metricsApi.create(formData);
      alert('Metric created successfully!');
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to create metric');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'value' ? parseFloat(value) || 0 : value,
    }));
  };

  return (
    <div className="metrics-form-container">
      <h2>Add New Metric</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="metrics-form">
        <div className="form-group">
          <label htmlFor="name">Metric Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="e.g., API Response Time"
          />
        </div>

        <div className="form-group">
          <label htmlFor="type">Type *</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="api_call">API Call</option>
            <option value="page_view">Page View</option>
            <option value="user_action">User Action</option>
            <option value="performance">Performance</option>
            <option value="error">Error</option>
            <option value="custom">Custom</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="value">Value *</label>
          <input
            type="number"
            id="value"
            name="value"
            value={formData.value}
            onChange={handleChange}
            required
            step="0.01"
            min="0"
            placeholder="e.g., 250"
          />
        </div>

        <div className="form-group">
          <label htmlFor="unit">Unit</label>
          <input
            type="text"
            id="unit"
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            placeholder="e.g., ms, requests, MB"
          />
        </div>

        <div className="form-group">
          <label htmlFor="userId">User ID</label>
          <input
            type="text"
            id="userId"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            placeholder="Optional user identifier"
          />
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate('/')} className="btn-secondary">
            Cancel
          </button>
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Creating...' : 'Create Metric'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MetricsForm;
