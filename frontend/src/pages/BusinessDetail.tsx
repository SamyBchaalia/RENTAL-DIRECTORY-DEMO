import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { businessApi, Business } from '../services/businessApi';
import './BusinessDetail.css';

const BusinessDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchBusiness(id);
    }
  }, [id]);

  const fetchBusiness = async (businessId: string) => {
    try {
      setLoading(true);
      const response = await businessApi.getOne(businessId);
      setBusiness(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Business not found');
    } finally {
      setLoading(false);
    }
  };

  const getCategoryLabel = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading business details...</p>
      </div>
    );
  }

  if (error || !business) {
    return (
      <div className="error-container">
        <h2>Business Not Found</h2>
        <p>{error || 'The business you are looking for does not exist.'}</p>
        <button onClick={() => navigate('/')} className="btn-primary">
          Back to Directory
        </button>
      </div>
    );
  }

  return (
    <div className="business-detail">
      <div className="container">
        <button onClick={() => navigate('/')} className="back-button">
          ← Back to Directory
        </button>

        <div className="detail-header">
          <div className="header-content">
            <div className="title-section">
              <h1>{business.name}</h1>
              {business.isFeatured && <span className="featured-badge">⭐ Featured</span>}
            </div>
            <span className={`category-badge category-${business.category}`}>
              {getCategoryLabel(business.category)}
            </span>
          </div>
          {business.rating && (
            <div className="rating-section">
              <span className="rating">⭐ {Number(business.rating).toFixed(1)}</span>
              <span className="reviews">({business.reviewCount} reviews)</span>
            </div>
          )}
        </div>

        <div className="detail-content">
          {/* Main Information */}
          <div className="main-section">
            <section className="info-card">
              <h2>About</h2>
              <p className="description">{business.description}</p>
            </section>

            {business.rentalItems && business.rentalItems.length > 0 && (
              <section className="info-card">
                <h2>Available Rentals</h2>
                <div className="rental-items-grid">
                  {business.rentalItems.map((item, idx) => (
                    <div key={idx} className="rental-item-card">
                      {item}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {business.amenities && business.amenities.length > 0 && (
              <section className="info-card">
                <h2>Amenities & Features</h2>
                <div className="amenities-list">
                  {business.amenities.map((amenity, idx) => (
                    <div key={idx} className="amenity-item">
                      ✓ {amenity}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {business.operatingHours && Object.keys(business.operatingHours).length > 0 && (
              <section className="info-card">
                <h2>Operating Hours</h2>
                <div className="hours-list">
                  {Object.entries(business.operatingHours).map(([day, hours]) => (
                    <div key={day} className="hour-item">
                      <span className="day">{day.charAt(0).toUpperCase() + day.slice(1)}:</span>
                      <span className="hours">{hours}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="sidebar-section">
            <div className="contact-card">
              <h3>Contact Information</h3>
              <div className="contact-info">
                <div className="contact-item">
                  <span className="icon">📍</span>
                  <div>
                    <div>{business.address}</div>
                    <div>{business.city}, {business.state && `${business.state}, `}{business.country}</div>
                    {business.zipCode && <div>{business.zipCode}</div>}
                  </div>
                </div>

                {business.phone && (
                  <div className="contact-item">
                    <span className="icon">📞</span>
                    <a href={`tel:${business.phone}`}>{business.phone}</a>
                  </div>
                )}

                <div className="contact-item">
                  <span className="icon">✉️</span>
                  <a href={`mailto:${business.email}`}>{business.email}</a>
                </div>

                {business.website && (
                  <div className="contact-item">
                    <span className="icon">🌐</span>
                    <a href={business.website} target="_blank" rel="noopener noreferrer">
                      Visit Website
                    </a>
                  </div>
                )}
              </div>

              <button className="contact-button">
                Contact Business
              </button>
            </div>

            <div className="location-card">
              <h3>Location</h3>
              <div className="location-info">
                <p>📍 {business.city}, {business.country}</p>
                {business.latitude && business.longitude && (
                  <p className="coordinates">
                    Coordinates: {Number(business.latitude).toFixed(4)}, {Number(business.longitude).toFixed(4)}
                  </p>
                )}
              </div>
              {/* Map integration can be added here */}
              <div className="map-placeholder">
                <p>Map integration ready</p>
                <small>(Google Maps / Mapbox)</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetail;
