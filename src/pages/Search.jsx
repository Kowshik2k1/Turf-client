import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const searchParams = new URLSearchParams(location.search);
  const initialQuery = searchParams.get('query') || '';
  const initialSport = searchParams.get('sport') || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [sport, setSport] = useState(initialSport);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTurfs = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${apiUrl}/api/turfs/search`, {
        params: {
          query: searchQuery,
          sport,
        },
      });
      setResults(res.data);
    } catch (err) {
      console.error('Error fetching search results:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTurfs();
  }, [location.search]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.append('query', searchQuery);
    if (sport) params.append('sport', sport);
    navigate(`/search?${params.toString()}`);
  };

  const handleClear = () => {
    setSearchQuery('');
    setSport('');
    navigate('/search');
  };

  const handleBook = (turf) => {
    navigate(`/booking/${turf._id}`);
  };

  return (
    <div className="container mt-4">
      {/* Search Filters */}
      <div className="row g-2 mb-4 align-items-center">
        <div className="col-md-5">
          <div className="input-group">
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Search by venue name or location"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="col-md-4">
          <div className="input-group">
            <select
              className="form-select border-start-0"
              value={sport}
              onChange={(e) => setSport(e.target.value)}
            >
              <option value="">All Sports</option>
              <option value="Badminton">Badminton</option>
              <option value="Cricket">Cricket</option>
            </select>
          </div>
        </div>

        <div className="col-md-2 d-flex gap-2">
          <button className="btn btn-primary w-100" onClick={handleSearch}>
            Search
          </button>
          {(searchQuery || sport) && (
            <button className="btn btn-outline-secondary" onClick={handleClear}>
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Search Results */}
      {loading ? (
        <p>Loading...</p>
      ) : results.length === 0 ? (
        <p>No turfs found.</p>
      ) : (
        <div className="row">
          {results.map((turf) => (
            <div className="col-md-4 mb-4" key={turf._id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={turf.image || `${turf.sport === 'Cricket' ? 'default-cricket.avif' : '/default-turf-image.avif'}`}
                  alt={turf.name}
                  className="card-img-top"
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{turf.name}</h5>
                  <p className="card-text">{turf.location}</p>
                  <p className="card-text fw-bold">₹{turf.pricePerHour}/hr</p>
                  <p className="text-muted">{turf.sport}</p>
                  <button
                    className="btn btn-success"
                    onClick={() => handleBook(turf)}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
