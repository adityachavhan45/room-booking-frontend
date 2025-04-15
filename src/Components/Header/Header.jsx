import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const userMenuRef = useRef(null);
  const userName = localStorage.getItem('userName');
  const { isAuthenticated: isLoggedIn, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;
      setIsScrolled(scrollY > 50);
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsUserMenuOpen(false);
  };

  return (
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

        <nav className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/rooms" className="nav-link" onClick={() => setIsMenuOpen(false)}>Rooms</Link>
          <Link to="/facilities" className="nav-link" onClick={() => setIsMenuOpen(false)}>Facilities</Link>
          <Link to="/offers" className="nav-link" onClick={() => setIsMenuOpen(false)}>Offers</Link>
          <Link to="/contact" className="nav-link" onClick={() => setIsMenuOpen(false)}>Contact</Link>
          <Link to="/about" className="nav-link" onClick={() => setIsMenuOpen(false)}>About</Link>
          
          {isLoggedIn ? (
            <div className="user-menu-container" ref={userMenuRef}>
              <button 
                className="user-menu-button"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
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
                    <Link to="/profile" className="user-menu-item" onClick={() => setIsUserMenuOpen(false)}>
                      <span className="material-icons">person</span>
                      Profile
                    </Link>
                    <Link to="/my-bookings" className="user-menu-item" onClick={() => setIsUserMenuOpen(false)}>
                      <span className="material-icons">book</span>
                      My Bookings
                    </Link>
                    <button onClick={handleLogout} className="user-menu-item logout-btn">
                      <span className="material-icons">logout</span>
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="login-btn" onClick={() => setIsMenuOpen(false)}>Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
