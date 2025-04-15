import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Routes, Route } from 'react-router-dom';
import DashboardHome from './Dashboard/DashboardHome';
import UserManagement from './Dashboard/UserManagement';
import BookingManagement from './Dashboard/BookingManagement';
import RoomManagement from './Dashboard/RoomManagement';
import './Dashboard/Dashboard.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Dashboard/Dashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activePage, setActivePage] = useState('home');
  
  useEffect(() => {
    const path = location.pathname.split('/').pop();
    if (path && path !== 'dashboard') {
      setActivePage(path);
    }
  }, [location]);

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      navigate('/admin/login');
      return;
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <div className="dashboard-layout">
      <div className="sidebar">
        <h2 className="admin-tital">Admin Panel</h2>
        <nav className="sidebar-nav">
          <a 
            href="#" 
            className={activePage === 'home' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              setActivePage('home');
              navigate('/admin/dashboard');
            }}
          >
            <i className="fas fa-home"></i>
            Dashboard
          </a>
          <a 
            href="#"
            className={activePage === 'users' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              setActivePage('users');
              navigate('/admin/dashboard/users');
            }}
          >
            <i className="fas fa-users"></i>
            Users
          </a>
          <a 
            href="#"
            className={activePage === 'bookings' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              setActivePage('bookings');
              navigate('/admin/dashboard/bookings');
            }}
          >
            <i className="fas fa-calendar-check"></i>
            Bookings
          </a>
          <a 
            href="#"
            className={activePage === 'rooms' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              setActivePage('rooms');
              navigate('/admin/dashboard/rooms');
            }}
          >
            <i className="fas fa-door-open"></i>
            Rooms
          </a>
          <button onClick={handleLogout} className="logout-btn">
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </nav>
      </div>

      <div className="main-content">
        <Routes>
          <Route index element={<DashboardHome />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="bookings" element={<BookingManagement />} />
          <Route path="rooms" element={<RoomManagement />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
