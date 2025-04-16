import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Rooms.css';
import { 
  FaWifi, 
  FaParking, 
  FaSwimmingPool, 
  FaUtensils, 
  FaCocktail, 
  FaSpa, 
  FaConciergeBell, 
  FaGlassMartiniAlt,
  FaSnowflake,
  FaTv,
  FaLaptop,
  FaBath
} from 'react-icons/fa';

const Rooms = () => {
  const navigate = useNavigate();
  const { token, isAuthenticated } = useAuth();
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [filters, setFilters] = useState({});
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    adults: 1,
    children: 0
  });
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch('https://room-booking-backend-9vb5.onrender.com/api/rooms');
        const data = await response.json();
        if (data.success) {
          setRooms(data.data);
        } else {
          console.error('Error fetching rooms:', data.message);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchRooms();
  }, []);

  const amenityIcons = {
    wifi: <FaWifi />,
    ac: <FaSnowflake />,
    tv: <FaTv />,
    minibar: <FaGlassMartiniAlt />,
    service: <FaConciergeBell />,
    pool: <FaSwimmingPool />,
    restaurant: <FaUtensils />,
    bar: <FaCocktail />,
    spa: <FaSpa />,
    parking: <FaParking />,
    workspace: <FaLaptop />,
    bathtub: <FaBath />
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    const storedToken = localStorage.getItem('userToken');
    
    if (!storedToken) {
      navigate('/login', { state: { returnUrl: '/rooms' } });
      return;
    }

    try {
      const response = await fetch('https://room-booking-backend-9vb5.onrender.com/api/bookings/book-room', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${storedToken}`
        },
        body: JSON.stringify({
          roomId: selectedRoom._id,
          roomName: selectedRoom.name,
          checkIn: bookingData.checkIn,
          checkOut: bookingData.checkOut,
          adults: bookingData.adults,
          children: bookingData.children,
          totalAmount: selectedRoom.price // Using room price as total amount for now
        })
      });

      const data = await response.json();
      if (data.success) {
        alert('Booking successful!');
        setSelectedRoom(null);
        setShowBookingForm(false);
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('Server error. Please try again later.');
    }
  };

  const filteredRooms = rooms.filter(room => room.available);

  if (rooms.length === 0) {
    return (
      <div className="no-rooms-container">
        <div className="no-rooms">No rooms available at the moment.</div>
      </div>
    );
  }

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

  return (
    <div className="rooms">
      <section className="rooms-hero" style={{ backgroundImage: 'url(https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg)' }}>
        <div className="hero-content">
          <h1>Our Rooms</h1>
          <p>Comfortable and affordable accommodations for everyone</p>
        </div>
      </section>

      <section className="rooms-container">
        <div className="rooms-grid">
          {filteredRooms.map((room) => (
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
                  <span><i className="fas fa-user"></i> Adults: {room.capacity.adults}, Children: {room.capacity.children}</span>
                  <span><i className="fas fa-expand"></i> {room.size}</span>
                  <span><i className="fas fa-bed"></i> {room.bed}</span>
                </div>
                <button 
                id='book-now-btn'
                  className={`book-button ${!room.available ? 'disabled' : ''}`}
                  onClick={() => {
                    if (room.available) {
                      setSelectedRoom(room);
                      setShowBookingForm(true);
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

      {showBookingForm && selectedRoom && (
        <div className="booking-form-overlay">
          <div className="booking-form">
            <button 
              className="close-booking-form" 
              onClick={() => setShowBookingForm(false)}
              aria-label="Close booking form"
            >
              ×
            </button>
            <h2>Book {selectedRoom.name}</h2>
            <form onSubmit={handleBookingSubmit}>
              <div className="form-group">
                <label>Check-in Date</label>
                <input 
                  type="date" 
                  value={bookingData.checkIn}
                  onChange={(e) => setBookingData(prev => ({ ...prev, checkIn: e.target.value }))}
                  required
                />
              </div>
              <div className="form-group">
                <label>Check-out Date</label>
                <input 
                  type="date"
                  value={bookingData.checkOut}
                  onChange={(e) => setBookingData(prev => ({ ...prev, checkOut: e.target.value }))}
                  required
                />
              </div>
              <div className="form-group">
                <label>Adults</label>
                <input 
                  type="number"
                  min="1"
                  max={selectedRoom.capacity.adults}
                  value={bookingData.adults}
                  onChange={(e) => setBookingData(prev => ({ ...prev, adults: parseInt(e.target.value) }))}
                  required
                />
              </div>
              <div className="form-group">
                <label>Children</label>
                <input 
                  type="number"
                  min="0"
                  max={selectedRoom.capacity.children}
                  value={bookingData.children}
                  onChange={(e) => setBookingData(prev => ({ ...prev, children: parseInt(e.target.value) }))}
                />
              </div>
              <div className="price-summary">
                <div className="summary-row">
                  <span>Room Rate</span>
                  <span>{formatPrice(selectedRoom.price)} / night</span>
                </div>
              </div>
              <button type="submit" className="submit-button">Confirm Booking</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rooms;
