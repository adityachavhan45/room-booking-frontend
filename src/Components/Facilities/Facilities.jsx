import React from 'react';
import './Facilities.css';

const Facilities = () => {
  const facilities = [
    {
      id: 1,
      name: 'Swimming Pool',
      description: 'Luxurious infinity pool with panoramic city views',
      image: '/images/pool.jpg',
      features: ['Temperature controlled', 'Poolside service', 'Loungers and cabanas', 'Kids pool']
    },
    {
      id: 2,
      name: 'Spa & Wellness',
      description: 'Rejuvenate your body and mind in our world-class spa',
      image: '/images/spa.jpg',
      features: ['Massage therapy', 'Steam room', 'Sauna', 'Beauty treatments']
    },
    {
      id: 3,
      name: 'Fitness Center',
      description: 'State-of-the-art equipment and personal training',
      image: '/images/gym.jpg',
      features: ['Modern equipment', 'Personal trainers', 'Yoga classes', 'Cardio area']
    },
    {
      id: 4,
      name: 'Fine Dining',
      description: 'Multiple restaurants offering international cuisine',
      image: '/images/restaurant.jpg',
      features: ['International cuisine', '24/7 room service', 'Bar & lounge', 'Private dining']
    },
    {
      id: 5,
      name: 'Business Center',
      description: 'Professional workspace with modern amenities',
      image: '/images/business.jpg',
      features: ['Meeting rooms', 'Video conferencing', 'High-speed internet', 'Secretarial services']
    },
    {
      id: 6,
      name: 'Event Spaces',
      description: 'Versatile venues for all types of events',
      image: '/images/events.jpg',
      features: ['Ballroom', 'Conference rooms', 'Wedding venue', 'Event planning']
    }
  ];

  return (
    <div className="facilities-container">
      <div className="facilities-hero">
        <h1>Our Facilities</h1>
        <p>Experience luxury and comfort with our world-class amenities</p>
      </div>

      <div className="facilities-grid">
        {facilities.map(facility => (
          <div key={facility.id} className="facility-card">
            <div className="facility-image">
              <img src={facility.image} alt={facility.name} />
              <div className="facility-overlay">
                <h3>{facility.name}</h3>
              </div>
            </div>
            <div className="facility-content">
              <p className="facility-description">{facility.description}</p>
              <ul className="facility-features">
                {facility.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <button className="learn-more-btn">Learn More</button>
            </div>
          </div>
        ))}
      </div>

      <section className="facilities-info">
        <div className="info-container">
          <div className="info-card">
            <h2>Operating Hours</h2>
            <ul>
              <li>Swimming Pool: 6:00 AM - 10:00 PM</li>
              <li>Spa & Wellness: 9:00 AM - 9:00 PM</li>
              <li>Fitness Center: 24/7</li>
              <li>Restaurants: 6:30 AM - 11:00 PM</li>
              <li>Business Center: 24/7</li>
            </ul>
          </div>

          <div className="info-card">
            <h2>Special Services</h2>
            <ul>
              <li>Personal training sessions</li>
              <li>Spa treatment packages</li>
              <li>Event planning assistance</li>
              <li>Business concierge</li>
              <li>Childcare services</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Facilities;
