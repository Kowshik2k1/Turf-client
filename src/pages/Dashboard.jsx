import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, token } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/bookings/my`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookings(res.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [token]);

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?"))
      return;
    try {
      await axios.delete(`${apiUrl}/api/bookings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Cancellation failed");
    }
  };

  const isPast = (date, slot) => {
    const now = new Date();
    const bookingDate = new Date(date + "T" + slot.split("-")[0] + ":00");
    return bookingDate < now;
  };

  return (
    <div className="container mt-4">
      <h2>Welcome back, {user?.name || "User"} 👋</h2>
      <hr />
      <h4 className="mb-3">My Bookings</h4>

      {loading ? (
        <p>Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        bookings.map((b) => (
          <div key={b._id} className="card mb-3 p-3">
            <h5>{b.turf?.name}</h5>
            <p>
              <strong>Date:</strong> {b.date} <br />
              <strong>Slot:</strong> {b.slot} <br />
              <strong>Location:</strong> {b.turf?.location}
            </p>

            {!isPast(b.date, b.slot) && (
              <div>
                <button
                  className="btn btn-outline-primary btn-sm me-2"
                  onClick={() =>
                    navigate(`/booking/${b.turf._id}?bookingId=${b._id}`)
                  }
                >
                  Modify
                </button>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleCancel(b._id)}
                >
                  Cancel
                </button>
              </div>
            )}

            {isPast(b.date, b.slot) && (
              <span className="badge bg-secondary">Completed</span>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Dashboard;
