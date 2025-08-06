import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/useAuth';
const apiUrl = import.meta.env.VITE_API_URL;

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/bookings/my`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBookings();
  }, [token]);

  return (
    <div className="container mt-4">
      <h2>Your Booking History</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th>Turf</th>
                <th>Location</th>
                <th>Date</th>
                <th>Slot</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b._id}>
                  <td>{b.turf.name}</td>
                  <td>{b.turf.location}</td>
                  <td>{b.date}</td>
                  <td>{b.slot}</td>
                  <td>{b.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BookingHistory;
