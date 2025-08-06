import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.elements.search.value.trim();
    if (query) {
      navigate(`/search?query=${query}`);
    }
  };

  return (
    <section className="hero bg-success text-white py-5 text-center">
      <div className="container">
        <h1 className="display-4 fw-bold">Book Your Favorite Turf Anytime</h1>
        <p>Search, schedule, and play – it's that easy.</p>
        <p className="lead mb-4">Find the best sports turfs near you and schedule with ease.</p>
        <form className="row g-2 justify-content-center" onSubmit={handleSearch}>
          <div className="col-md-6">
            <input
              type="text"
              name="search"
              className="form-control form-control-lg"
              placeholder="Search by location or turf name..."
            />
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-light btn-lg text-success fw-bold">
              Search
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Hero;
