// components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="custom-footer py-5">
      <div className="container">
        <div className="row gy-4">
          <div className="col-md-4">
            <div className="logo mb-3">
              <span className="logo-icon">T</span>
              <span className="logo-text">TurfBook</span>
            </div>
            <p className="">
              The easiest way to discover and book premium sports facilities. Play your favorite sport at top-quality venues.
            </p>
          </div>

          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/search">Find Turfs</Link></li>
              <li><Link to="/how-it-works">How it Works</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/support">Support</Link></li>
            </ul>
          </div>

          <div className="col-md-4">
            <h5>Account</h5>
            <ul className="list-unstyled">
              <li><Link to="/login">Log In</Link></li>
              <li><Link to="/signup">Sign Up</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/bookings">My Bookings</Link></li>
            </ul>
          </div>
        </div>

        <hr className="my-4" />
        <p className="text-center mb-0">© 2024 TurfBook. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
