import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const DashboardHome = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBookings: 0,
    totalRevenue: 0,
    recentBookings: []
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const adminToken = localStorage.getItem('adminToken');
      const config = {
        headers: { Authorization: `Bearer ${adminToken}` }
      };

      const response = await axios.get('https://room-booking-backend-production.up.railway.app/api/admin/stats', config);
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <div className="dashboard-home">
      <h2>Dashboard Overview</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-rupee-sign"></i>
          </div>
          <h3>Total Sales</h3>
          <div className="stat-number">₹{stats.totalRevenue || '150,000'}</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-chart-line"></i>
          </div>
          <h3>Monthly Sales</h3>
          <div className="stat-number">₹{stats.monthlyRevenue || '45,000'}</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-shopping-cart"></i>
          </div>
          <h3>Total Orders</h3>
          <div className="stat-number">{stats.totalBookings || '250'}</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-times-circle"></i>
          </div>
          <h3>Cancelled Orders</h3>
          <div className="stat-number">{stats.cancelledBookings || '12'}</div>
        </div>
      </div>

      <div className="recent-activity">
        <h3>Recent Bookings</h3>
        <div className="activity-list">
          {stats.recentBookings && stats.recentBookings.map((booking) => (
            <div key={booking._id} className="activity-item">
              <div className="activity-info">
                <p><strong>{booking.user.name}</strong> booked {booking.room.name}</p>
                <p className="activity-date">
                  {new Date(booking.checkIn).toLocaleDateString()} - 
                  {new Date(booking.checkOut).toLocaleDateString()}
                </p>
              </div>
              <p className="activity-amount">₹{booking.totalAmount}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
