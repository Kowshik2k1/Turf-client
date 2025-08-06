import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/useAuth";

const Booking = () => {
  const { turfId } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const apiUrl = import.meta.env.VITE_API_URL;

  const location = useLocation();
  const bookingId = new URLSearchParams(location.search).get("bookingId");

  const [venue, setVenue] = useState("");
  const [turf, setTurf] = useState(null);
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);
  
  useEffect(() => {
    const fetchTurfAndBooking = async () => {
      try {
        const turfRes = await axios.get(`${apiUrl}/api/turfs/${turfId}`);
        setTurf(turfRes.data);

        if (bookingId) {
          const bookingRes = await axios.get(`${apiUrl}/api/bookings/my`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const existing = bookingRes.data.find((b) => b._id === bookingId);
          if (existing) {
            setDate(existing.date);
            setSlot(existing.slot);
            setVenue(existing.venue);
          }
        }
      } catch (err) {
        console.error("Error fetching turf or booking:", err);
      }
    };

    fetchTurfAndBooking();
  }, [turfId, bookingId, token]);

  useEffect(() => {
    const fetchSlots = async () => {
      if (date) {
        try {
          const res = await axios.get(
            `${apiUrl}/api/turfs/${turfId}/available-slots?date=${date}`
          );
          setAvailableSlots(res.data);
        } catch (err) {
          console.error("Error fetching slots:", err);
        }
      }
    };
    fetchSlots();
  }, [date, turfId]);

  const handleBooking = async () => {
    if (!date || !slot || !venue) {
      alert("Please select a date, venue, and slot.");
      return;
    }

    try {
      const payload = { turfId, date, slot, venue };

      if (bookingId) {
        // Modify existing booking
        await axios.patch(
          `${apiUrl}/api/bookings/${bookingId}`,
          payload,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        alert("Booking updated!");
      } else {
        // Create new booking
        await axios.post(`${apiUrl}/api/bookings`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Booking successful!");
      }

      navigate("/dashboard");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed");
    }
  };

  const isPastSlot = (slot) => {
    const [startHour] = slot.split(":");
    const now = new Date();
    return (
      new Date(date).toDateString() === now.toDateString() &&
      parseInt(startHour) <= now.getHours()
    );
  };

  const handleReviewSubmit = async () => {
    if (!rating || !comment) {
      alert("Please provide rating and comment");
      return;
    }

    try {
      setSubmittingReview(true);
      await axios.post(
        `${apiUrl}/api/turfs/${turfId}/reviews`,
        { rating, comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Review submitted!");
      setRating(0);
      setComment("");
      // Refresh turf data to get updated reviews
      const updated = await axios.get(`${apiUrl}/api/turfs/${turfId}`);
      setTurf(updated.data);
    } catch (err) {
      alert(err.response?.data?.message || "Review failed");
    } finally {
      setSubmittingReview(false);
    }
  };

  if (!turf) {
    return <div className="container mt-4">Loading turf details...</div>;
  }

  return (
    <div className="container mt-4">
      <h2>Book: {turf.name}</h2>
      <p>Location: {turf.location}</p>
      <p>
        Price: ₹{turf.pricePerHour}/hr | Sport: {turf.sport}
      </p>

      <div className="mb-3">
        <label htmlFor="date">Select Date:</label>
        <input
          type="date"
          className="form-control"
          id="date"
          value={date}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="venue">Select Venue:</label>
        <select
          className="form-control"
          id="venue"
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
        >
          <option value="">Select a venue</option>
          {turf.venues.map((v) => (
            <option key={v._id} value={v._id}>
              {v.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="slot">Select Slot:</label>
        <select
          className="form-control"
          id="slot"
          value={slot}
          onChange={(e) => setSlot(e.target.value)}
          disabled={!date}
        >
          <option value="" disabled>
            Select a slot
          </option>
          {availableSlots
            .filter((s) => !isPastSlot(s))
            .map((s, idx) => (
              <option key={idx} value={s}>
                {s}
              </option>
            ))}
        </select>
      </div>

      <button className="btn btn-success mb-4" onClick={handleBooking}>
        Confirm Booking
      </button>

      <hr />

      <h4>Average Rating: {turf.avgRating.toFixed(1)} ★</h4>
      <p>Total Reviews: {turf.numReviews}</p>

      <h5 className="mt-4">Leave a Review</h5>
      <div className="mb-3">
        <label>Rating:</label>
        <select
          className="form-control"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        >
          <option value="">Select rating</option>
          {[1, 2, 3, 4, 5].map((r) => (
            <option key={r} value={r}>
              {r} ★
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label>Comment:</label>
        <textarea
          className="form-control"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
        />
      </div>
      <button
        className="btn btn-primary mb-5"
        onClick={handleReviewSubmit}
        disabled={submittingReview}
      >
        {submittingReview ? "Submitting..." : "Submit Review"}
      </button>

      <hr />

      <h5 className="mb-3">User Reviews</h5>
      {turf.reviews.length === 0 && <p>No reviews yet.</p>}
      {turf.reviews.map((r) => (
        <div key={r._id} className="border rounded p-3 mb-3">
          <strong>{r.name}</strong> – {r.rating} ★<p>{r.comment}</p>
          <small>{new Date(r.createdAt).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
};

export default Booking;
