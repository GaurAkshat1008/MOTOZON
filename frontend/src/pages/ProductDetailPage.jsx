import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axiosConfig';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    api.get(`/api/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
    api.get(`/api/products/reviews/${id}`)
      .then(res => setReviews(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleAdd = () => {
    addToCart(product, qty);
    alert('Added to cart');
  };

  const submitReview = async e => {
    e.preventDefault();
    try {
      await api.post(`/api/products/reviews`, { rating: newRating, comment: newComment, product: id });
      setNewRating(5);
      setNewComment('');
      const res = await api.get(`/api/products/reviews/${id}`);
      setReviews(res.data);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to submit review');
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={
            product.image.startsWith("http")
              ? product.image
              : `/uploads/${product.image}`
          }
          alt={product.name}
          className="w-full md:w-1/2 h-auto object-cover"
        />
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-xl text-gray-800 mb-4">₹{product.price}</p>
          <p className="mb-4">{product.description}</p>
          <p className="mb-4">Category: {product.category}</p>
          <p className="mb-4">Stock: {product.stock}</p>
          <div className="flex items-center space-x-2 mb-4">
            <label>Quantity:</label>
            <input
              type="number"
              min="1"
              max={product.stock}
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="w-20 p-1 border rounded"
            />
          </div>
          <button
            onClick={handleAdd}
            disabled={product.stock < 1}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Add to Cart
          </button>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl mb-4">Reviews</h2>
        {reviews.length === 0 && <p>No reviews yet.</p>}
        <ul className="space-y-4">
          {reviews.map((r) => (
            <li key={r._id} className="border p-4 rounded">
              <p className="font-semibold">
                {r.user.name}{" "}
                <span className="text-yellow-500">{"★".repeat(r.rating)}</span>
              </p>
              <p className="text-gray-700">{r.comment}</p>
              <p className="text-sm text-gray-500">
                {new Date(r.createdAt).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
        <div className="mt-6">
          {user ? (
            <form onSubmit={submitReview} className="space-y-2">
              <label className="block">
                Rating:
                <select
                  value={newRating}
                  onChange={(e) => setNewRating(Number(e.target.value))}
                  className="ml-2 p-1 border rounded"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </label>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write your review"
                required
                className="w-full p-2 border rounded"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Submit Review
              </button>
            </form>
          ) : (
            <p>
              Please{" "}
              <Link to="/login" className="text-blue-500">
                login
              </Link>{" "}
              to write a review.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;