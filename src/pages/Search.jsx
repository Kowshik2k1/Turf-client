import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;

  // Extract query param from URL
  const query = new URLSearchParams(location.search).get('query') || '';

  useEffect(() => {
    const fetchTurfs = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/turfs/search?query=${query}`);
        setResults(res.data);
      } catch (err) {
        console.error('Error fetching search results:', err);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchTurfs();
    } else {
      setLoading(false);
    }
  }, [query]);

  const handleBook = (turf) => {
    navigate('/booking', { state: { turf } });
  };

  return (
    <div className="container mt-4">
      <h2>Search Results for "{query}"</h2>

      {loading && <p>Loading...</p>}

      {!loading && results.length === 0 && <p>No turfs found.</p>}

      <div className="row">
        {results.map((turf) => (
          <div className="col-md-4 mb-4" key={turf._id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{turf.name}</h5>
                <p className="card-text">{turf.location}</p>
                <p className="card-text fw-bold">₹{turf.pricePerHour}/hr</p>
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
    </div>
  );
};

export default Search;
