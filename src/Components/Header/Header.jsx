import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Header.css';
import { useAuth } from '../../context/AuthContext';
import { navItemInteractive, buttonHover } from '../Interactive';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const userMenuRef = useRef(null);
  const menuRef = useRef(null);
  const menuToggleRef = useRef(null);
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
      // Close user menu when clicking outside
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      
      // Close mobile menu when clicking outside
      if (isMenuOpen && menuRef.current && !menuRef.current.contains(event.target) && 
          !menuToggleRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    // Close mobile menu on window resize (if screen becomes larger)
    const handleResize = () => {
      if (window.innerWidth > 968 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMenuOpen]);

  // Close menus when route changes (using location from react-router)
  useEffect(() => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsUserMenuOpen(false);
  };

  // Toggle menu function
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  // Handle navigation with menu closing
  const handleNavigation = (path) => {
    // First close the menus
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
    
    // Small delay to ensure UI updates before navigation
    setTimeout(() => {
      navigate(path);
    }, 10);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-content">
        <Link to="/" className="logo hover:scale-105 transition-transform duration-300">
          RoomFusion
        </Link>

        <button 
          className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} 
          onClick={toggleMenu}
          ref={menuToggleRef}
          aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`nav-links ${isMenuOpen ? 'active' : ''}`} ref={menuRef}>
          <Link to="/" className={`nav-link ${navItemInteractive}`} onClick={() => handleNavigation('/')}>Home</Link>
          <Link to="/rooms" className={`nav-link ${navItemInteractive}`} onClick={() => handleNavigation('/rooms')}>Rooms</Link>
          {/* <Link to="/facilities" className={`nav-link ${navItemInteractive}`} onClick={() => handleNavigation('/facilities')}>Facilities</Link> */}
          {/* <Link to="/offers" className={`nav-link ${navItemInteractive}`} onClick={() => handleNavigation('/offers')}>Offers</Link> */}
          <Link to="/contact" className={`nav-link ${navItemInteractive}`} onClick={() => handleNavigation('/contact')}>Contact</Link>
          <Link to="/about" className={`nav-link ${navItemInteractive}`} onClick={() => handleNavigation('/about')}>About</Link>
          
          {isLoggedIn ? (
            <div className="user-menu-container" ref={userMenuRef}>
              <button 
                className="user-menu-button hover:opacity-80 transition-opacity duration-300"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                <div className="user-avatar hover:shadow-lg transition-shadow duration-300">
                  {userName ? userName.charAt(0).toUpperCase() : 'U'}
                </div>
              </button>
              {isUserMenuOpen && (
                <div className="user-menu animate-fadeIn">
                  <div className="user-info">
                    <div className="user-avatar-large">
                      {userName ? userName.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div className="user-details">
                      <p className="user-name">{userName}</p>
                    </div>
                  </div>
                  <div className="user-menu-items">
                    <div className="user-menu-item hover:bg-gray-100 transition-colors duration-300" onClick={() => handleNavigation('/profile')}>
                      <span className="material-icons">person</span>
                      Profile
                    </div>
                    <div className="user-menu-item hover:bg-gray-100 transition-colors duration-300" onClick={() => handleNavigation('/my-bookings')}>
                      <span className="material-icons">book</span>
                      My Bookings
                    </div>
                    <button onClick={handleLogout} className="user-menu-item logout-btn hover:bg-red-50 hover:text-red-600 transition-colors duration-300">
                      <span className="material-icons">logout</span>
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className={`login-btn ${buttonHover}`} onClick={() => handleNavigation('/login')}>Login</div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;