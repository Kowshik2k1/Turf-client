import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send to backend or API)
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-us">
      <div className="container">
        <div className="contact-header">
          <h1>Contact Us</h1>
          <p>Got questions or want to book a turf? Reach out to us!</p>
        </div>

        <div className="contact-content">
          <div className="contact-form">
            <h2>Send Us a Message</h2>
            <div className="form-container">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
              <button onClick={handleSubmit}>Send Message</button>
            </div>
          </div>

          <div className="contact-info">
            <h2>Contact Information</h2>
            <div className="info-item">
              <i className="fas fa-phone"></i>
              <p>+1 (555) 123-4567</p>
            </div>
            <div className="info-item">
              <i className="fas fa-envelope"></i>
              <p>support@turfsite.com</p>
            </div>
            <div className="info-item">
              <i className="fas fa-map-marker-alt"></i>
              <p>123 Turf Lane, Sports City, SC 12345</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
