import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Header.css';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileUserMenuOpen, setIsMobileUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const userMenuRef = useRef(null);
  const mobileUserMenuRef = useRef(null);
  const userName = localStorage.getItem('userName');
  const { isAuthenticated: isLoggedIn, logout } = useAuth();

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
    setIsMobileUserMenuOpen(false);
  }, [location.pathname]);
  
  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle clicks outside user menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      if (mobileUserMenuRef.current && !mobileUserMenuRef.current.contains(event.target)) {
        setIsMobileUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
    setIsMobileUserMenuOpen(false);
  };

  // Toggle user menu
  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  // Toggle mobile user menu
  const toggleMobileUserMenu = () => {
    setIsMobileUserMenuOpen(!isMobileUserMenuOpen);
  };

  return (
    <>
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-content">
          <Link to="/" className="logo">
            RoomFusion
          </Link>

          <button 
            className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
          </button>

          <nav className="desktop-nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/rooms" className="nav-link">Rooms</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
            <Link to="/about" className="nav-link">About</Link>
            
            {isLoggedIn ? (
              <div className="user-menu-container" ref={userMenuRef}>
                <button 
                  className="user-menu-button"
                  onClick={toggleUserMenu}
                >
                  <div className="user-avatar">
                    {userName ? userName.charAt(0).toUpperCase() : 'U'}
                  </div>
                </button>
                {isUserMenuOpen && (
                  <div className="user-menu">
                    <div className="user-info">
                      <div className="user-avatar-large">
                        {userName ? userName.charAt(0).toUpperCase() : 'U'}
                      </div>
                      <div className="user-details">
                        <p className="user-name">{userName}</p>
                      </div>
                    </div>
                    <div className="user-menu-items">
                      <Link to="/profile" className="user-menu-item">
                        Profile
                      </Link>
                      <Link to="/my-bookings" className="user-menu-item">
                        My Bookings
                      </Link>
                      <button onClick={handleLogout} className="user-menu-item logout-btn">
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="login-btn">Login</Link>
            )}
          </nav>
        </div>
      </header>

      {/* Simple Mobile Menu */}
      {isMenuOpen && (
        <div className="simple-mobile-menu">
          <div className="simple-mobile-menu-header">
            <button onClick={() => setIsMenuOpen(false)} className="simple-close-btn">×</button>
          </div>
          <div className="simple-mobile-menu-links">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/rooms" onClick={() => setIsMenuOpen(false)}>Rooms</Link>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
            <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
            
            {isLoggedIn && (
              <div className="mobile-user-menu-container" ref={mobileUserMenuRef}>
                <button 
                  className="mobile-user-avatar-button"
                  onClick={toggleMobileUserMenu}
                >
                  <div className="mobile-user-avatar">
                    {userName ? userName.charAt(0).toUpperCase() : 'U'}
                  </div>
                </button>
                
                {isMobileUserMenuOpen && (
                  <div className="mobile-user-menu">
                    <Link to="/profile" onClick={() => setIsMenuOpen(false)}>Profile</Link>
                    <Link to="/my-bookings" onClick={() => setIsMenuOpen(false)}>My Bookings</Link>
                    <button onClick={handleLogout} className="simple-logout-btn">Logout</button>
                  </div>
                )}
              </div>
            )}
            
            {!isLoggedIn && (
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="simple-login-btn">Login</Link>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;