import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Offers.css';

const Offers = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const offers = [
    {
      id: 1,
      title: 'Weekend Getaway Package',
      category: 'packages',
      image: '/images/weekend-getaway.jpg',
      description: 'Enjoy a luxurious weekend stay with breakfast, spa treatment, and late checkout.',
      price: '14999',
      originalPrice: '21999',
      features: [
        'Deluxe Room Accommodation',
        'Complimentary Breakfast for Two',
        '60-min Spa Treatment',
        'Late Checkout until 3 PM',
        'Access to All Facilities'
      ],
      validity: 'Valid until December 31, 2025'
    },
    {
      id: 2,
      title: 'Honeymoon Special',
      category: 'packages',
      image: '/images/honeymoon.jpg',
      description: 'Make your honeymoon unforgettable with our romantic package.',
      price: '29999',
      originalPrice: '42999',
      features: [
        'Suite Room with Ocean View',
        'Romantic Dinner Setup',
        'Couple Spa Treatment',
        'Champagne and Chocolates',
        'Rose Petal Decoration'
      ],
      validity: 'Valid until December 31, 2025'
    },
    {
      id: 3,
      title: 'Early Bird Discount',
      category: 'discounts',
      image: '/images/early-bird.jpg',
      description: 'Book in advance and save up to 25% on your stay.',
      price: 'Save 25%',
      features: [
        'Valid on all room types',
        'Minimum 30 days advance booking',
        'Free Cancellation',
        'Breakfast Included',
        'No blackout dates'
      ],
      validity: 'Valid until December 31, 2025'
    },
    {
      id: 4,
      title: 'Business Travel Deal',
      category: 'business',
      image: '/images/business-deal.jpg',
      description: 'Special rates and perks for business travelers.',
      price: '9999',
      originalPrice: '14999',
      features: [
        'Executive Room',
        'Airport Transfer',
        'Business Center Access',
        'Breakfast and Dinner',
        'Laundry Service'
      ],
      validity: 'Valid until December 31, 2025'
    }
  ];

  const filteredOffers = selectedCategory === 'all' 
    ? offers 
    : offers.filter(offer => offer.category === selectedCategory);

  return (
    <div className="offers-container">
      <div className="offers-hero">
        <h1>Special Offers</h1>
        <p>Discover our exclusive deals and packages</p>
      </div>

      <div className="offers-content">
        <div className="offers-filter">
          <button 
            className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            All Offers
          </button>
          <button 
            className={`filter-btn ${selectedCategory === 'packages' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('packages')}
          >
            Packages
          </button>
          <button 
            className={`filter-btn ${selectedCategory === 'discounts' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('discounts')}
          >
            Discounts
          </button>
          <button 
            className={`filter-btn ${selectedCategory === 'business' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('business')}
          >
            Business
          </button>
        </div>

        <div className="offers-grid">
          {filteredOffers.map(offer => (
            <div key={offer.id} className="offer-card">
              <div className="offer-image">
                <img src={offer.image} alt={offer.title} />
                {offer.originalPrice && (
                  <div className="offer-badge">
                    Save {formatPrice(parseInt(offer.originalPrice) - parseInt(offer.price))}
                  </div>
                )}
              </div>
              <div className="offer-content">
                <h3>{offer.title}</h3>
                <p className="offer-description">{offer.description}</p>
                <div className="offer-features">
                  <h4>What's Included:</h4>
                  <ul>
                    {offer.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <div className="offer-footer">
                  <div className="offer-price">
                    {offer.originalPrice && (
                      <span className="original-price">{formatPrice(parseInt(offer.originalPrice))}</span>
                    )}
                    <span className="current-price">
                      {offer.price.includes('%') ? offer.price : formatPrice(parseInt(offer.price))}
                    </span>
                  </div>
                  <Link to="/rooms" className="book-now-btn">
                    Book Now
                  </Link>
                </div>
                <p className="validity">{offer.validity}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="offers-info">
          <div className="info-card">
            <h3>Terms & Conditions</h3>
            <ul>
              <li>All rates are subject to availability</li>
              <li>Prices are per room per night</li>
              <li>Blackout dates may apply</li>
              <li>Rates include taxes and service charges</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offers;
