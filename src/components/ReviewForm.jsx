import { useState } from 'react';
import axios from 'axios';

const ReviewForm = ({ turfId, onReviewAdded }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `/api/turfs/${turfId}/reviews`,
        { rating, comment },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      onReviewAdded(); // Refresh turf details
      setComment('');
      setRating(5);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add review');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 border rounded">
      <h5>Leave a Review</h5>
      {error && <div className="text-danger">{error}</div>}
      <div className="mb-2">
        <label>Rating</label>
        <select
          className="form-select"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num} - {['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][num - 1]}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-2">
        <label>Comment</label>
        <textarea
          className="form-control"
          value={comment}
          rows={3}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      </div>
      <button className="btn btn-primary">Submit</button>
    </form>
  );
};

export default ReviewForm;
