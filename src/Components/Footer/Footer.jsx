import React from "react";
import { Link } from "react-router-dom";
import './Footer.css'; // Make sure to import the footer styles
import { linkHover, scaleOnHover } from '../Interactive';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-heading hover:text-blue-300 transition-colors duration-300">About Us</h3>
          <p className="footer-text hover:text-white transition-colors duration-300">
            We are a premier hotel offering luxurious rooms, top-notch amenities, and exceptional customer service.
          </p>
        </div>

        <div className="footer-section">
          <h3 className="footer-heading hover:text-blue-300 transition-colors duration-300">Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/rooms" className={`footer-link ${linkHover}`}>Rooms</Link></li>
            <li><Link to="/services" className={`footer-link ${linkHover}`}>Services</Link></li>
            {/* <li><Link to="/facilities" className={`footer-link ${linkHover}`}>Facilities</Link></li> */}
            {/* <li><Link to="/offers" className={`footer-link ${linkHover}`}>Offers</Link></li> */}
            <li><Link to="/contact" className={`footer-link ${linkHover}`}>Contact Us</Link></li>
            <li><Link to="/about" className={`footer-link ${linkHover}`}>About Us</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-heading hover:text-blue-300 transition-colors duration-300">Contact</h3>
          <p className="footer-text hover:text-white transition-colors duration-300">123 Hotel Street, City, Country</p>
          <p className="footer-text hover:text-white transition-colors duration-300">Phone: +1 234 567 890</p>
          <p className="footer-text hover:text-white transition-colors duration-300">Email: info@roomfusion.com</p>
        </div>

        <div className="footer-section">
          <h3 className="footer-heading hover:text-blue-300 transition-colors duration-300">Follow Us</h3>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={`social-link ${scaleOnHover}`}>
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={`social-link ${scaleOnHover}`}>
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={`social-link ${scaleOnHover}`}>
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={`social-link ${scaleOnHover}`}>
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-text hover:text-blue-300 transition-colors duration-300"> {new Date().getFullYear()} RoomFusion. All Rights Reserved.<br/>
        <span style={{fontSize:'1.25em',color:'#90cdf4',fontWeight:'bold'}}>Designed and developed by Aditya Chavhan <span style={{color:'#e53e3e'}}>❤️</span></span></p>
      </div>
    </footer>
  );
}

export default Footer;
