import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';
import './Rooms.css';

const Rooms = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch('https://room-booking-backend-9vb5.onrender.com/api/rooms');
        const data = await response.json();
        if (data.success) {
          setRooms(data.data);
        } else {
          setError(data.message);
        }
      } catch (error) {
        console.error('Error fetching rooms:', error);
        setError('Failed to fetch rooms');
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span key={index} className={`star ${index < rating ? 'filled' : ''}`}>★</span>
    ));
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <FaSpinner className="loading-spinner" />
          <h2>Loading Rooms...</h2>
          <p>Please wait while we fetch the available rooms for you.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-content">
          <h2>Server is busy</h2>
          <p>We're experiencing high traffic at the moment. Please wait a moment and try again.</p>
          <button 
            className="retry-button"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rooms">
      <section className="rooms-hero" style={{ backgroundImage: 'url(https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1200)' }}>
        <div className="hero-content">
          <h1>Our Rooms</h1>
          <p>Comfortable and affordable accommodations for everyone</p>
        </div>
      </section>

      <section className="rooms-container">
        <div className="rooms-grid">
          {rooms.map((room) => (
            <div key={room._id} className={`room-card ${!room.available ? 'unavailable' : ''}`}>
              <div className="room-image">
                <img src={room.image} alt={room.name} />
                <div className="room-price">
                  <span>{formatPrice(room.price)}</span>
                  <small>/night</small>
                </div>
                {!room.available && <div className="unavailable-badge">Fully Booked</div>}
                <div className="room-rating">
                  {renderStars(room.rating)}
                  <span className="review-count">({room.reviews} reviews)</span>
                </div>
              </div>
              <div className="room-info">
                <h3>{room.name}</h3>
                <p>{room.description}</p>
                <div className="room-features">
                  <span><i className="fas fa-user"></i> {room.maxOccupancy} Adults</span>
                  <span><i className="fas fa-bed"></i> {room.bed}</span>
                </div>
                <button 
                  id='book-now-btn'
                  className={`book-button ${!room.available ? 'disabled' : ''}`}
                  onClick={() => {
                    if (room.available) {
                      navigate('/booking-process', { state: { room } });
                    }
                  }}
                  disabled={!room.available}
                >
                  {room.available ? 'Book Now' : 'Not Available'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Rooms;
