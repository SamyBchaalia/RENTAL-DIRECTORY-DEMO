import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { businessApi, CreateBusinessDto, BusinessCategory } from '../services/businessApi';
import './AddBusiness.css';

const AddBusiness = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<CreateBusinessDto>({
    name: '',
    description: '',
    category: BusinessCategory.OTHER,
    email: '',
    address: '',
    city: '',
    country: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await businessApi.create(formData);
      alert('Business added successfully!');
      navigate(`/business/${response.data.id}`);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to add business');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleArrayChange = (field: 'rentalItems' | 'amenities', value: string) => {
    const items = value.split(',').map(item => item.trim()).filter(item => item);
    setFormData((prev) => ({
      ...prev,
      [field]: items.length > 0 ? items : undefined,
    }));
  };

  return (
    <div className="add-business-page">
      <div className="container">
        <div className="form-header">
          <h1>List Your Rental Business</h1>
          <p>Join the global rental directory and reach customers worldwide</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="business-form">
          <div className="form-section">
            <h2>Basic Information</h2>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Business Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Premium Car Rentals"
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Category *</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value={BusinessCategory.VEHICLES}>Vehicles</option>
                  <option value={BusinessCategory.PROPERTIES}>Properties</option>
                  <option value={BusinessCategory.EQUIPMENT}>Equipment</option>
                  <option value={BusinessCategory.EVENTS}>Events</option>
                  <option value={BusinessCategory.RECREATION}>Recreation</option>
                  <option value={BusinessCategory.ELECTRONICS}>Electronics</option>
                  <option value={BusinessCategory.FURNITURE}>Furniture</option>
                  <option value={BusinessCategory.TOOLS}>Tools</option>
                  <option value={BusinessCategory.OTHER}>Other</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Describe your rental business and what makes it unique..."
              />
            </div>
          </div>

          <div className="form-section">
            <h2>Contact Information</h2>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="contact@business.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone || ''}
                  onChange={handleChange}
                  placeholder="+1-555-1234"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="website">Website</label>
              <input
                type="url"
                id="website"
                name="website"
                value={formData.website || ''}
                onChange={handleChange}
                placeholder="https://www.yourbusiness.com"
              />
            </div>
          </div>

          <div className="form-section">
            <h2>Location</h2>

            <div className="form-group">
              <label htmlFor="address">Street Address *</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                placeholder="123 Main Street"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City *</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  placeholder="New York"
                />
              </div>

              <div className="form-group">
                <label htmlFor="state">State/Province</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state || ''}
                  onChange={handleChange}
                  placeholder="NY"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="country">Country *</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  placeholder="United States"
                />
              </div>

              <div className="form-group">
                <label htmlFor="zipCode">Zip/Postal Code</label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode || ''}
                  onChange={handleChange}
                  placeholder="10001"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Additional Details</h2>

            <div className="form-group">
              <label htmlFor="rentalItems">Rental Items (comma-separated)</label>
              <input
                type="text"
                id="rentalItems"
                name="rentalItems"
                onChange={(e) => handleArrayChange('rentalItems', e.target.value)}
                placeholder="Sedans, SUVs, Vans, Sports Cars"
              />
              <small>Enter items separated by commas</small>
            </div>

            <div className="form-group">
              <label htmlFor="amenities">Amenities & Features (comma-separated)</label>
              <input
                type="text"
                id="amenities"
                name="amenities"
                onChange={(e) => handleArrayChange('amenities', e.target.value)}
                placeholder="GPS, Insurance, 24/7 Support, Free Delivery"
              />
              <small>Enter amenities separated by commas</small>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
            >
              {loading ? 'Adding Business...' : 'Add Business'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBusiness;
