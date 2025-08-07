import React from "react";
import Hero from "../components/Hero";

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      <div className="home">
        <section className="hero container"></section>
        <section className="features text-center">
          <div className="container">
            <h2 className="mb-5">Why Choose TurfBook?</h2>
            <div className="row g-4">
              <div className="col-md-4">
                <div className="feature-item">
                  <i className="bi bi-calendar-check display-5 text-success"></i>
                  <h5>Instant Booking</h5>
                  <p>
                    Book turfs instantly with real-time availability and
                    confirmation.
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="feature-item">
                  <i className="bi bi-geo-alt display-5 text-success"></i>
                  <h5>Top Locations</h5>
                  <p>
                    Find the best-rated sports turfs near your area with ease.
                  </p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="feature-item">
                  <i className="bi bi-star display-5 text-success"></i>
                  <h5>User Reviews</h5>
                  <p>
                    Read genuine feedback from players before making your
                    decision.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <section className="testimonials">
        <div className="container">
          <h2 className="text-center mb-5">What Players Say</h2>
          <div className="row justify-content-center">
            <div className="col-md-5 testimonial">
              <p>
                "Booking a turf was never this easy! TurfBook has streamlined my
                weekend matches."
              </p>
              <div className="author">— Rahul M.</div>
            </div>
            <div className="col-md-5 testimonial">
              <p>
                "I found a turf just 2km from my place. The rating system really
                helps."
              </p>
              <div className="author">— Anjali P.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Ready to play?</h2>
          <p>Join thousands of players already booking with TurfBook</p>
          <a href="/search" className="btn btn-cta">
            Find a Turf
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
