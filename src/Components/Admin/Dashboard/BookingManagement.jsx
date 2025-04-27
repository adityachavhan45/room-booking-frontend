import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';
import './BookingActions.css';
import { toast } from 'react-toastify';

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

      const response = await axios.get('http://localhost:5000/api/bookings/admin/all', config);
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
      case 'confirmed': return 'status-confirmed';
      case 'pending': return 'status-pending';
      case 'cancelled': return 'status-cancelled';
      case 'completed': return 'status-completed';
      case 'rejected': return 'status-rejected';
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
                  <th>Payment Method</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map(booking => (
                  <tr key={booking._id}>
                    <td>{formatDate(booking.createdAt)}</td>
                    <td>{booking.userName || (booking.userId && booking.userId.name) || 'N/A'}</td>
                    <td>{booking.roomName}</td>
                    <td>{formatDate(booking.checkIn)}</td>
                    <td>{formatDate(booking.checkOut)}</td>
                    <td>{booking.adults + (booking.children || 0)}</td>
                    <td>₹{booking.totalAmount}</td>
                    <td>
                      <span className={`payment-method ${booking.paymentMethod === 'online' ? 'payment-online' : 'payment-cash'}`}>
                        {booking.paymentMethod === 'online' ? 'Online Payment' : 'Cash on Check-in'}
                      </span>
                    </td>
                    <td>
                      <span className={`status-badge ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td>
                      <div className="table-actions">
                        {booking.status === 'pending' && (
                          <>
                            <button 
                              className="btn-confirm"
                              onClick={() => handleStatusChange(booking._id, 'confirmed')}
                            >
                              Confirm
                            </button>
                            <button 
                              className="btn-reject"
                              onClick={() => handleStatusChange(booking._id, 'rejected')}
                            >
                              Reject
                            </button>
                          </>
                        )}
                        {booking.status === 'confirmed' && (
                          <>
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
                          </>
                        )}
                      </div>
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
