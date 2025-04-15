import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const adminToken = localStorage.getItem('adminToken');
      const config = {
        headers: { Authorization: `Bearer ${adminToken}` }
      };

      const response = await axios.get('http://localhost:5000/api/admin/bookings', config);
      setBookings(response.data.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setLoading(false);
    }
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      const adminToken = localStorage.getItem('adminToken');
      const config = {
        headers: { Authorization: `Bearer ${adminToken}` }
      };

      await axios.patch(`http://localhost:5000/api/admin/bookings/${bookingId}/status`, {
        status: newStatus
      }, config);

      fetchBookings();
    } catch (error) {
      console.error('Error updating booking status:', error);
    }
  };

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true;
    return booking.status === filter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'booked': return 'status-confirmed';
      case 'cancelled': return 'status-cancelled';
      case 'completed': return 'status-completed';
      default: return '';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN');
  };

  return (
    <div className="booking-management">
      <div className="page-header">
        <h2>Booking Management</h2>
        <div className="filter-buttons">
          <button 
            className={filter === 'all' ? 'active' : ''} 
            onClick={() => setFilter('all')}
          >
            All Bookings
          </button>
          <button 
            className={filter === 'booked' ? 'active' : ''} 
            onClick={() => setFilter('booked')}
          >
            Active
          </button>
          <button 
            className={filter === 'completed' ? 'active' : ''} 
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
          <button 
            className={filter === 'cancelled' ? 'active' : ''} 
            onClick={() => setFilter('cancelled')}
          >
            Cancelled
          </button>
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading bookings...</div>
      ) : (
        <div className="table-responsive">
          {filteredBookings.length === 0 ? (
            <div className="no-bookings">No bookings found</div>
          ) : (
            <table className="bookings-table">
              <thead>
                <tr>
                  <th>Booking Date</th>
                  <th>Guest Name</th>
                  <th>Room</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th>Guests</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map(booking => (
                  <tr key={booking._id}>
                    <td>{formatDate(booking.createdAt)}</td>
                    <td>{booking.userName}</td>
                    <td>{booking.roomName}</td>
                    <td>{booking.checkIn}</td>
                    <td>{booking.checkOut}</td>
                    <td>{booking.adults + booking.children}</td>
                    <td>₹{booking.totalAmount}</td>
                    <td>
                      <span className={`status-badge ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td>
                      {booking.status === 'booked' && (
                        <div className="table-actions">
                          <button 
                            className="btn-complete"
                            onClick={() => handleStatusChange(booking._id, 'completed')}
                          >
                            Complete
                          </button>
                          <button 
                            className="btn-cancel"
                            onClick={() => handleStatusChange(booking._id, 'cancelled')}
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default BookingManagement;
