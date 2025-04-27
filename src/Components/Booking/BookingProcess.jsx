import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaUser, FaChild, FaCalendarAlt } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import './BookingProcess.css';

const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const BookingProcess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const room = location.state?.room;

  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    adults: 1,
    children: 0
  });
  const [totalPrice, setTotalPrice] = useState(room?.price || 0);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!room) {
    return navigate('/rooms');
  }

  // Calculate number of days between check-in and check-out
  const calculateDays = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Update total price when dates change
  useEffect(() => {
    const days = calculateDays(bookingData.checkIn, bookingData.checkOut);
    setTotalPrice(days * room.price);
  }, [bookingData.checkIn, bookingData.checkOut, room.price]);

  const handleBookingSubmit = async (paymentMethod) => {
    const storedToken = localStorage.getItem('userToken');
    
    if (!storedToken) {
      navigate('/login', { state: { returnUrl: '/booking-process', roomData: room } });
      return;
    }

    try {
      const response = await fetch('https://room-booking-backend-9vb5.onrender.com/api/bookings', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${storedToken}`
        },
        body: JSON.stringify({
          roomId: room._id,
          checkIn: bookingData.checkIn,
          checkOut: bookingData.checkOut,
          adults: bookingData.adults,
          children: bookingData.children,
          paymentMethod: paymentMethod,
          totalAmount: totalPrice
        })
      });

      const data = await response.json();
      if (data.success) {
        alert('Booking successful!');
        navigate('/my-bookings');
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('Server error. Please try again later.');
    }
  };

  const handleOnlinePayment = async () => {
    const res = await loadRazorpay();
    if (!res) {
      alert('Razorpay SDK failed to load');
      return;
    }

    try {
      if (!bookingData.checkIn || !bookingData.checkOut || !bookingData.adults) {
        alert('Please fill all required booking details');
        return;
      }

      const storedToken = localStorage.getItem('userToken');
      if (!storedToken) {
        navigate('/login', { state: { returnUrl: '/booking-process', roomData: room } });
        return;
      }

      const orderResponse = await fetch('https://room-booking-backend-9vb5.onrender.com/api/payment/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${storedToken}`
        },
        body: JSON.stringify({
          amount: totalPrice,
          bookingDetails: {
            roomId: room._id,
            roomName: room.name,
            checkIn: bookingData.checkIn,
            checkOut: bookingData.checkOut,
            adults: bookingData.adults,
            children: bookingData.children,
            totalAmount: totalPrice,
            roomType: room.type,
            roomNumber: room.number
          }
        })
      });

      const orderData = await orderResponse.json();
      
      if (!orderData.success) {
        throw new Error(orderData.message || 'Failed to create payment order');
      }

      const options = {
        key: 'rzp_test_GIWuqweMSnoaxQ',
        amount: orderData.order.amount,
        currency: 'INR',
        name: 'Hotel Room Booking',
        description: `Booking for ${room.name} (${bookingData.checkIn} to ${bookingData.checkOut})`,
        order_id: orderData.order.orderId,
        prefill: {
          name: user?.name || '',
          email: user?.email || '',
          contact: user?.phone || ''
        },
        notes: {
          roomId: room._id,
          roomName: room.name,
          checkIn: bookingData.checkIn,
          checkOut: bookingData.checkOut
        },
        theme: {
          color: '#3399cc'
        },
        handler: async (response) => {
          try {
            setLoading(true);
            
            const verifyResponse = await fetch('https://room-booking-backend-9vb5.onrender.com/api/payment/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${storedToken}`
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                bookingDetails: {
                  roomId: room._id,
                  roomName: room.name,
                  checkIn: bookingData.checkIn,
                  checkOut: bookingData.checkOut,
                  adults: bookingData.adults,
                  children: bookingData.children,
                  totalAmount: totalPrice
                }
              })
            });

            const data = await verifyResponse.json();
            
            if (!verifyResponse.ok) {
              throw new Error(data.message || 'Error verifying payment');
            }

            if (data.success) {
              alert('Payment successful and room booked!');
              navigate('/my-bookings');
            } else {
              throw new Error(data.message || 'Payment verification failed');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            alert('Payment verification failed. Please contact support with this ID: ' + response.razorpay_payment_id);
          } finally {
            setLoading(false);
          }
        }
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      console.error('Payment error:', error);
      alert('Error initiating payment: ' + (error.message || 'Please try again.'));
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="booking-process">
      <div className="booking-container">
        <div className="room-details">
          <img src={room.image} alt={room.name} className="room-image" />
          <div className="room-info">
            <h2>{room.name}</h2>
            <div className="room-features">
              <span><FaUser /> Max Adults: {room.maxOccupancy}</span>
              <span><FaChild /> Children Allowed: Yes</span>
              <span className="room-price">{formatPrice(room.price)}<small>/night</small></span>
            </div>
            <p className="room-description">{room.description}</p>
          </div>
        </div>

        <div className="booking-form">
          <h3>Book Your Stay</h3>
          <form>
            <div className="form-group">
              <label><FaCalendarAlt /> Check-in Date</label>
              <input 
                type="date"
                value={bookingData.checkIn}
                onChange={(e) => setBookingData(prev => ({ ...prev, checkIn: e.target.value }))}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div className="form-group">
              <label><FaCalendarAlt /> Check-out Date</label>
              <input 
                type="date"
                value={bookingData.checkOut}
                onChange={(e) => setBookingData(prev => ({ ...prev, checkOut: e.target.value }))}
                min={bookingData.checkIn || new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div className="form-group">
              <label><FaUser /> Number of Adults</label>
              <input 
                type="number"
                value={bookingData.adults}
                onChange={(e) => setBookingData(prev => ({ ...prev, adults: parseInt(e.target.value) }))}
                min="1"
                max={room.maxOccupancy}
                required
              />
            </div>

            <div className="form-group">
              <label><FaChild /> Number of Children</label>
              <input 
                type="number"
                value={bookingData.children}
                onChange={(e) => setBookingData(prev => ({ ...prev, children: parseInt(e.target.value) }))}
                min="0"
                max="2"
              />
            </div>

            <div className="price-summary">
              <div className="summary-row">
                <span>Room Rate (per night)</span>
                <span>{formatPrice(room.price)}</span>
              </div>
              {bookingData.checkIn && bookingData.checkOut && (
                <div className="summary-row">
                  <span>Number of Nights</span>
                  <span>{calculateDays(bookingData.checkIn, bookingData.checkOut)}</span>
                </div>
              )}
              <div className="summary-row total">
                <span>Total Amount</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
            </div>

            <button 
              type="button" 
              className="proceed-button"
              onClick={() => {
                if(!bookingData.checkIn || !bookingData.checkOut || !bookingData.adults) {
                  alert('Please fill all required fields');
                  return;
                }
                setShowPaymentOptions(true);
              }}
            >
              Proceed to Payment
            </button>
          </form>
        </div>
      </div>

      {showPaymentOptions && (
        <div className="payment-options-overlay">
          <div className="payment-options-panel">
            <button 
              className="close-payment-options" 
              onClick={() => setShowPaymentOptions(false)}
            >
              ×
            </button>
            <h2>Select Payment Method</h2>
            <div className="payment-options-container">
              <div className="payment-option-card" onClick={() => handleBookingSubmit('cash')}>
                <div className="payment-icon cash-icon">
                  <i className="fas fa-money-bill-wave"></i>
                </div>
                <h3>Cash on Check-in</h3>
                <p>Pay at the hotel when you arrive</p>
                <button className="select-payment-btn">Select</button>
              </div>
              
              <div className="payment-option-card" onClick={handleOnlinePayment}>
                <div className="payment-icon online-icon">
                  <i className="fas fa-credit-card"></i>
                </div>
                <h3>Online Payment</h3>
                <p>Pay now using Razorpay</p>
                <button className="select-payment-btn">Select</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingProcess;
