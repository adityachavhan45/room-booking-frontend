import React, { useState, useEffect, useCallback, memo } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

// Lazy load images
const imageUrls = {
  slider1: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1200',
  slider2: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1200',
  slider3: 'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=1200',
  pool: 'https://images.pexels.com/photos/261327/pexels-photo-261327.jpeg?auto=compress&cs=tinysrgb&w=800',
  dining: 'https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg?auto=compress&cs=tinysrgb&w=800',
  spa: 'https://images.pexels.com/photos/3188/love-romantic-bath-candlelight.jpg?auto=compress&cs=tinysrgb&w=800',
  fitness: 'https://images.pexels.com/photos/949126/pexels-photo-949126.jpeg?auto=compress&cs=tinysrgb&w=800',
  welcome: 'https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg?auto=compress&cs=tinysrgb&w=1200',
  experience: 'https://images.pexels.com/photos/2869215/pexels-photo-2869215.jpeg?auto=compress&cs=tinysrgb&w=1200',
  cta: 'https://images.pexels.com/photos/2598638/pexels-photo-2598638.jpeg?auto=compress&cs=tinysrgb&w=1200'
};

// Memoized slide component
const HeroSlide = memo(({ slide, isActive }) => (
  <div
    className={`hero-slide ${isActive ? 'active' : ''}`}
    style={{ 
      backgroundImage: `url(${slide.image})`,
      width: '100vw',
      left: '0',
      right: '0',
      margin: '0',
      padding: '0'
    }}
  >
    <div className="hero-content">
      <h1>{slide.title}</h1>
      <p>{slide.subtitle}</p>
      <Link to="/rooms" className="cta-button">
        Book Your Stay
      </Link>
    </div>
  </div>
));

// Memoized service card component
const ServiceCard = memo(({ service }) => (
  <div className="service-card" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${service.image})` }}>
    <span className="service-icon">{service.icon}</span>
    <h3>{service.title}</h3>
    <p>{service.description}</p>
  </div>
));

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSliderPaused, setIsSliderPaused] = useState(false);

  const slides = [
    {
      image: imageUrls.slider1,
      title: 'Welcome to RoomFusion',
      subtitle: 'Experience unparalleled comfort and elegance'
    },
    {
      image: imageUrls.slider2,
      title: 'Exquisite Dining',
      subtitle: 'Savor culinary excellence at its finest'
    },
    {
      image: imageUrls.slider3,
      title: 'Premium Amenities',
      subtitle: 'Indulge in world-class facilities'
    }
  ];

  const services = [
    {
      icon: '🏊‍♂️',
      title: 'Infinity Pool',
      description: 'Swim in our rooftop infinity pool with panoramic city views',
      image: imageUrls.pool
    },
    {
      icon: '🍽️',
      title: 'Fine Dining',
      description: 'Experience culinary excellence at our restaurants',
      image: imageUrls.dining
    },
    {
      icon: '💆‍♀️',
      title: 'Luxury Spa',
      description: 'Rejuvenate your body and mind at our world-class spa',
      image: imageUrls.spa
    },
    {
      icon: '🏋️‍♂️',
      title: 'Fitness Center',
      description: '24/7 access to state-of-the-art fitness equipment',
      image: imageUrls.fitness
    }
  ];

  const nextSlide = useCallback(() => {
    if (!isSliderPaused) {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }
  }, [isSliderPaused, slides.length]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const handleSliderMouseEnter = () => setIsSliderPaused(true);
  const handleSliderMouseLeave = () => setIsSliderPaused(false);

  return (
    <div className="home">
      <div 
        className="hero-slider"
        onMouseEnter={handleSliderMouseEnter}
        onMouseLeave={handleSliderMouseLeave}
        style={{
          width: '100vw',
          position: 'relative',
          left: '50%',
          right: '50%',
          marginLeft: '-50vw',
          marginRight: '-50vw',
          overflow: 'hidden'
        }}
      >
        {slides.map((slide, index) => (
          <HeroSlide
            key={index}
            slide={slide}
            isActive={index === currentSlide}
          />
        ))}
        
        <div className="slider-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>

      <section className="welcome-section">
        <div className="welcome-content">
          <h2>Welcome to RoomFusion</h2>
          <p>Experience the perfect blend of comfort, luxury, and exceptional service. Our hotel offers world-class amenities and breathtaking views to make your stay unforgettable.</p>
          <Link to="/about" className="learn-more-btn">Learn More</Link>
        </div>
        <div className="welcome-image">
          <img loading="lazy" src={imageUrls.welcome} alt="Hotel Interior" />
        </div>
      </section>

      <section className="services-section">
        <h2>Our Services</h2>
        <div className="services-grid">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </section>

      <section className="experience-section" style={{ backgroundImage: `url(${imageUrls.experience})` }}>
        <div className="experience-content">
          <div className="experience-text">
            <h2>Experience Luxury</h2>
            <p>Immerse yourself in an atmosphere of elegance and sophistication. Our carefully curated experiences ensure every moment of your stay is exceptional.</p>
            <Link to="/facilities" className="explore-btn">Explore Facilities</Link>
          </div>
          <div className="experience-stats">
            <div className="stat-item">
              <span className="stat-number">150+</span>
              <span className="stat-label">Luxury Rooms</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">4</span>
              <span className="stat-label">Restaurants</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Room Service</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Satisfaction</span>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section" style={{ backgroundImage: `url(${imageUrls.cta})` }}>
        <div className="cta-content">
          <h2>Special Offers</h2>
          <p>Book directly with us to get the best available rates and exclusive benefits.</p>
          <Link to="/offers" className="cta-button">View Offers</Link>
        </div>
      </section>
    </div>
  );
};

export default memo(Home);
