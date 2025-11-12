import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { businessApi, Business, BusinessCategory, SearchParams } from '../services/businessApi';
import './HomePage.css';

const HomePage = () => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<SearchParams>({
    page: 1,
    limit: 12,
    isActive: true,
  });
  const [total, setTotal] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchBusinesses();
  }, [filters]);

  const fetchBusinesses = async () => {
    try {
      setLoading(true);
      const response = await businessApi.getAll(filters);
      setBusinesses(response.data.data);
      setTotal(response.data.total);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch businesses');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters({ ...filters, query: searchQuery, page: 1 });
  };

  const handleCategoryFilter = (category: BusinessCategory | undefined) => {
    setFilters({ ...filters, category, page: 1 });
  };

  const handlePageChange = (newPage: number) => {
    setFilters({ ...filters, page: newPage });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getCategoryLabel = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  const totalPages = Math.ceil(total / (filters.limit || 12));

  if (loading && businesses.length === 0) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading rental businesses...</p>
      </div>
    );
  }

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Find Rental Services Worldwide</h1>
          <p className="hero-subtitle">
            Discover and connect with rental businesses across the globe
          </p>
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search by name, category, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="categories-section">
        <div className="container">
          <div className="categories-filter">
            <button
              className={`category-btn ${!filters.category ? 'active' : ''}`}
              onClick={() => handleCategoryFilter(undefined)}
            >
              All Categories
            </button>
            {Object.values(BusinessCategory).map((category) => (
              <button
                key={category}
                className={`category-btn ${filters.category === category ? 'active' : ''}`}
                onClick={() => handleCategoryFilter(category)}
              >
                {getCategoryLabel(category)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="results-section">
        <div className="container">
          {error && <div className="error-message">{error}</div>}

          <div className="results-header">
            <h2>
              {filters.query ? `Search results for "${filters.query}"` : 'All Rental Businesses'}
            </h2>
            <p className="results-count">
              {total} {total === 1 ? 'business' : 'businesses'} found
            </p>
          </div>

          {businesses.length === 0 ? (
            <div className="no-results">
              <p>No businesses found. Try adjusting your search criteria.</p>
            </div>
          ) : (
            <>
              <div className="businesses-grid">
                {businesses.map((business) => (
                  <Link
                    key={business.id}
                    to={`/business/${business.id}`}
                    className="business-card"
                  >
                    {business.isFeatured && (
                      <div className="featured-badge">⭐ Featured</div>
                    )}
                    <div className="business-card-header">
                      <h3 className="business-name">{business.name}</h3>
                      <span className={`category-badge category-${business.category}`}>
                        {getCategoryLabel(business.category)}
                      </span>
                    </div>
                    <p className="business-location">
                      📍 {business.city}, {business.country}
                    </p>
                    <p className="business-description">
                      {business.description.substring(0, 150)}
                      {business.description.length > 150 ? '...' : ''}
                    </p>
                    {business.rating && (
                      <div className="business-rating">
                        ⭐ {Number(business.rating).toFixed(1)} ({business.reviewCount} reviews)
                      </div>
                    )}
                    {business.rentalItems && business.rentalItems.length > 0 && (
                      <div className="rental-items">
                        {business.rentalItems.slice(0, 3).map((item, idx) => (
                          <span key={idx} className="rental-item-tag">
                            {item}
                          </span>
                        ))}
                        {business.rentalItems.length > 3 && (
                          <span className="rental-item-tag">
                            +{business.rentalItems.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    onClick={() => handlePageChange(filters.page! - 1)}
                    disabled={filters.page === 1}
                    className="pagination-btn"
                  >
                    ← Previous
                  </button>
                  <span className="pagination-info">
                    Page {filters.page} of {totalPages}
                  </span>
                  <button
                    onClick={() => handlePageChange(filters.page! + 1)}
                    disabled={filters.page === totalPages}
                    className="pagination-btn"
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
