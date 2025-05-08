import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    api.get('/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);
  return (
    <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((p) => (
        <Link
          key={p._id}
          to={`/products/${p._id}`}
          className="border rounded-lg overflow-hidden hover:shadow-lg"
        >
          <div className="w-full h-48 overflow-hidden">
            <img
              src={p.image.startsWith("http") ? p.image : `/uploads/${p.image}`}
              alt={p.name}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="p-4">
            <h2 className="font-semibold text-lg">{p.name}</h2>
            <p className="text-gray-700 mt-1">₹{p.price}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default HomePage;