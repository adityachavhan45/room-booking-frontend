import React from 'react';
import './About.css';

const About = () => {
  const stats = [
    { number: '10+', label: 'Years of Excellence' },
    { number: '1000+', label: 'Happy Guests' },
    { number: '150', label: 'Luxury Rooms' },
    { number: '50+', label: 'Team Members' }
  ];

  const team = [
    {
      name: 'John Smith',
      position: 'General Manager',
      image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg'
    },
    {
      name: 'Sarah Johnson',
      position: 'Guest Relations Manager',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg'
    },
    {
      name: 'Michael Chen',
      position: 'Executive Chef',
      image: 'https://images.pexels.com/photos/532220/pexels-photo-532220.jpeg'
    }
  ];

  return (
    <div className="about">
      <section className="hero-section" style={{ backgroundImage: 'url(https://images.pexels.com/photos/161758/governor-s-mansion-montgomery-alabama-grand-staircase-161758.jpeg)' }}>
        <div className="hero-content">
          <h1>About RoomFusion</h1>
          <p>Where Luxury Meets Comfort</p>
        </div>
      </section>

      <section className="mission-section">
        <div className="container">
          <div className="mission-content">
            <h2>Our Mission</h2>
            <p>At RoomFusion, we are dedicated to providing exceptional hospitality experiences that exceed our guests' expectations. Our commitment to excellence, attention to detail, and personalized service ensure that every stay is memorable.</p>
          </div>
          <div className="mission-image">
            <img src="https://images.pexels.com/photos/237371/pexels-photo-237371.jpeg" alt="Luxury Hotel Interior" />
          </div>
        </div>
      </section>

      <section className="stats-section" style={{ backgroundImage: 'url(https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg)' }}>
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <span className="stat-number">{stat.number}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="values-section">
        <div className="container">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">💫</div>
              <h3>Excellence</h3>
              <p>We strive for excellence in every aspect of our service.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Integrity</h3>
              <p>We conduct our business with the highest ethical standards.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">❤️</div>
              <h3>Passion</h3>
              <p>We are passionate about creating exceptional experiences.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🌟</div>
              <h3>Innovation</h3>
              <p>We continuously evolve to meet our guests' changing needs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="team-section">
        <div className="container">
          <h2>Our Leadership Team</h2>
          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-card">
                <div className="team-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <h3>{member.name}</h3>
                <p>{member.position}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      <section className="cta-section" style={{ backgroundImage: 'url(https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg)' }}>
        <div className="container">
          <div className="cta-content">
            <h2>Experience Luxury with Us</h2>
            <p>Book your stay today and discover the perfect blend of comfort and elegance.</p>
            <a href="/rooms" className="cta-button">View Our Rooms</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
