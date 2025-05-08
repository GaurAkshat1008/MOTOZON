import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import { Link } from 'react-router-dom';

const MyReviewsPage = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await api.get('/api/user/reviews');
        setReviews(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchReviews();
  }, []);

  if (reviews.length === 0) {
    return <p className="container mx-auto p-4">You have not written any reviews yet.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">My Reviews</h2>
      <ul className="space-y-4">
        {reviews.map(r => (
          <li key={r._id} className="border p-4 rounded">
            <Link to={`/products/${r.product._id}`} className="font-semibold text-blue-600 hover:underline">
              {r.product.name}
            </Link>
            <p className="text-yellow-500">{'★'.repeat(r.rating)}</p>
            <p className="mt-2 text-gray-700">{r.comment}</p>
            <p className="mt-1 text-sm text-gray-500">Reviewed on {new Date(r.createdAt).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyReviewsPage;