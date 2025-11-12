import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { businessApi, Business } from '../services/businessApi';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [businessesRes, statsRes] = await Promise.all([
        businessApi.getAll({ limit: 100, isActive: undefined }),
        businessApi.getStats(),
      ]);
      setBusinesses(businessesRes.data.data);
      setStats(statsRes.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (id: string) => {
    try {
      await businessApi.toggleActive(id);
      fetchData();
    } catch (error) {
      alert('Failed to toggle status');
    }
  };

  const handleToggleFeatured = async (id: string) => {
    try {
      await businessApi.toggleFeatured(id);
      fetchData();
    } catch (error) {
      alert('Failed to toggle featured status');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this business?')) {
      try {
        await businessApi.delete(id);
        fetchData();
      } catch (error) {
        alert('Failed to delete business');
      }
    }
  };

  if (loading) {
    return <div className="admin-loading">Loading...</div>;
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="admin-header-content">
          <div>
            <h1>🔧 Admin Dashboard</h1>
            <p>Manage rental businesses</p>
          </div>
          <div className="admin-header-actions">
            <Link to="/" className="admin-btn admin-btn-secondary">
              ← Back to Directory
            </Link>
            <Link to="/add" className="admin-btn admin-btn-primary">
              + Add Business
            </Link>
          </div>
        </div>
      </header>

      {stats && (
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Businesses</h3>
            <p className="stat-value">{stats.total}</p>
          </div>
          <div className="stat-card">
            <h3>Active</h3>
            <p className="stat-value">{stats.active}</p>
          </div>
          <div className="stat-card">
            <h3>Inactive</h3>
            <p className="stat-value">{stats.inactive}</p>
          </div>
          <div className="stat-card">
            <h3>Featured</h3>
            <p className="stat-value">{stats.featured}</p>
          </div>
        </div>
      )}

      <div className="businesses-table-container">
        <h2>All Businesses</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Location</th>
              <th>Status</th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {businesses.map((business) => (
              <tr key={business.id}>
                <td>
                  <strong>{business.name}</strong>
                </td>
                <td>{business.category}</td>
                <td>{business.city}, {business.country}</td>
                <td>
                  <button
                    onClick={() => handleToggleActive(business.id)}
                    className={`status-btn ${business.isActive ? 'active' : 'inactive'}`}
                  >
                    {business.isActive ? 'Active' : 'Inactive'}
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleToggleFeatured(business.id)}
                    className={`featured-btn ${business.isFeatured ? 'featured' : ''}`}
                  >
                    {business.isFeatured ? '⭐ Featured' : 'Not Featured'}
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(business.id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
