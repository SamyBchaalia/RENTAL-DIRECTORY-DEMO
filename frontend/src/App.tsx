import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BusinessDetail from './pages/BusinessDetail';
import AddBusiness from './pages/AddBusiness';
import AdminDashboard from './admin/AdminDashboard';
import './App.css';

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return (
      <div className="app">
        <Routes>
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    );
  }

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="nav-brand">
            <h1 className="nav-title">🌍 Global Rental Directory</h1>
          </Link>
          <div className="nav-links">
            <Link to="/" className="nav-link">Browse</Link>
            <Link to="/add" className="nav-link nav-link-cta">List Your Business</Link>
            <Link to="/admin" className="nav-link">Admin</Link>
          </div>
        </div>
      </nav>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/business/:id" element={<BusinessDetail />} />
          <Route path="/add" element={<AddBusiness />} />
        </Routes>
      </main>
      <footer className="footer">
        <div className="footer-container">
          <p>&copy; 2024 Global Rental Directory. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
