import React from "react";
import { Link } from "react-router-dom";
import './Footer.css'; // Make sure to import the footer styles

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-heading">About Us</h3>
          <p className="footer-text">
            We are a premier hotel offering luxurious rooms, top-notch amenities, and exceptional customer service.
          </p>
        </div>

        <div className="footer-section">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/rooms" className="footer-link">Rooms</Link></li>
            <li><Link to="/services" className="footer-link">Services</Link></li>
            {/* <li><Link to="/facilities" className="footer-link">Facilities</Link></li> */}
            {/* <li><Link to="/offers" className="footer-link">Offers</Link></li> */}
            <li><Link to="/contact" className="footer-link">Contact Us</Link></li>
            <li><Link to="/about" className="footer-link">About Us</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-heading">Contact</h3>
          <p className="footer-text">123 Hotel Street, City, Country</p>
          <p className="footer-text">Phone: +1 234 567 890</p>
          <p className="footer-text">Email: info@roomfusion.com</p>
        </div>

        <div className="footer-section">
          <h3 className="footer-heading">Follow Us</h3>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-text"> {new Date().getFullYear()} RoomFusion. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
