import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const BookingPage = () => {
  const location = useLocation();
  const turf = location.state?.turf;

  const [bookingDate, setBookingDate] = useState('');

  const handlePayment = async () => {
    try {
      const res = await axios.post('/api/payments/checkout-session', {
        turf,
        bookingDate,
        amount: turf.price,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      window.location.href = res.data.url;
    } catch (err) {
      alert('Payment failed.');
    }
  };

  if (!turf) {
    return <div className="text-center mt-5">No turf selected</div>;
  }

  return (
    <div className="container my-4">
      <h2>Book: {turf.name}</h2>
      <p>Location: {turf.location}</p>
      <p>Price: ₹{turf.price} / hr</p>

      <label htmlFor="bookingDate" className="form-label">Choose Date:</label>
      <input
        type="date"
        id="bookingDate"
        className="form-control mb-3"
        value={bookingDate}
        onChange={(e) => setBookingDate(e.target.value)}
      />

      <button className="btn btn-success" onClick={handlePayment} disabled={!bookingDate}>
        Pay & Book Now
      </button>
    </div>
  );
};

export default BookingPage;
