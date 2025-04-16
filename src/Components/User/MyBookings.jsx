import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './MyBookings.css';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const token = localStorage.getItem('userToken');

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login', { state: { returnUrl: '/my-bookings' } });
            return;
        }
        fetchMyBookings();
    }, [token, navigate]);

    const fetchMyBookings = async () => {
        try {
            const response = await axios.get('https://room-booking-backend-s2wi.onrender.com/api/bookings/my-bookings', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setBookings(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching bookings:', error);
            setLoading(false);
        }
    };

    const cancelBooking = async (bookingId) => {
        try {
            await axios.put(`https://room-booking-backend-production.up.railway.app/api/bookings/${bookingId}/cancel`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchMyBookings(); // Refresh bookings after cancellation
        } catch (error) {
            console.error('Error cancelling booking:', error);
        }
    };

    if (loading) return <div className="loading">Loading...</div>;

    return (
        <div className="my-bookings-container">
            <h2>My Bookings</h2>
            {bookings.length === 0 ? (
                <p>No bookings found.</p>
            ) : (
                <div className="bookings-grid">
                    {bookings.map((booking) => (
                        <div key={booking._id} className="booking-card">
                            <h3>{booking.roomName}</h3>
                            <div className="booking-details">
                                <p><strong>Check In:</strong> {booking.checkIn}</p>
                                <p><strong>Check Out:</strong> {booking.checkOut}</p>
                                <p><strong>Guests:</strong> {booking.adults} Adults, {booking.children} Children</p>
                                <p><strong>Amount:</strong> ₹{booking.totalAmount}</p>
                                <p><strong>Status:</strong> <span className={`status ${booking.status}`}>{booking.status}</span></p>
                            </div>
                            {booking.status === 'booked' && (
                                <button 
                                    className="cancel-btn"
                                    onClick={() => cancelBooking(booking._id)}
                                >
                                    Cancel Booking
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyBookings;
