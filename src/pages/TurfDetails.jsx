import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReviewForm from '../components/ReviewForm';

const TurfDetails = () => {
  const { id } = useParams(); // turf ID from route
  const [turf, setTurf] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTurf = async () => {
    try {
      const res = await axios.get(`/api/turfs/${id}`);
      setTurf(res.data);
    } catch (err) {
      console.error('Error fetching turf:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTurf();
  }, [id]);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (!turf) return <div className="text-center mt-5 text-danger">Turf not found</div>;

  return (
    <div className="container my-4">
      <h2 className="mb-3">{turf.name}</h2>
      <img
        src={turf.image || '/placeholder.jpg'}
        alt={turf.name}
        className="img-fluid mb-3 rounded"
        style={{ maxHeight: '300px', objectFit: 'cover' }}
      />
      <p><strong>Location:</strong> {turf.location}</p>
      <p><strong>Price:</strong> ₹{turf.price} / hour</p>
      <p><strong>Average Rating:</strong> ⭐ {turf.avgRating?.toFixed(1) || 'N/A'} ({turf.numReviews} reviews)</p>

      <hr />

      <h4 className="mt-4">Reviews</h4>
      {turf.reviews?.length > 0 ? (
        turf.reviews.map((review) => (
          <div key={review._id} className="mb-3 border-bottom pb-2">
            <strong>{review.name}</strong> - ⭐ {review.rating}
            <p>{review.comment}</p>
          </div>
        ))
      ) : (
        <p>No reviews yet</p>
      )}

      <hr />

      <ReviewForm turfId={turf._id} onReviewAdded={fetchTurf} />
    </div>
  );
};

export default TurfDetails;
