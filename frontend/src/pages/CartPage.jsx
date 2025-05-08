import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { cartItems, updateQty, removeFromCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.qty, 0);

  const handleCheckout = () => {
    // Placeholder for checkout flow
    alert('Proceed to checkout');
    navigate('/');
  };

  if (cartItems.length === 0) return <p className="container mx-auto p-4">Your cart is empty.</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Shopping Cart</h2>
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.product._id}
            className="flex items-center space-x-4 border p-4 rounded"
          >
            <img
              src={
                item.product.image.startsWith("http")
                  ? item.product.image
                  : `/uploads/${item.product.image}`
              }
              alt={item.product.name}
              className="w-20 h-20 object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold">{item.product.name}</h3>
              <p>₹{item.product.price}</p>
            </div>
            <input
              type="number"
              min="1"
              value={item.qty}
              onChange={(e) =>
                updateQty(item.product._id, Number(e.target.value))
              }
              className="w-16 p-1 border rounded"
            />
            <button
              onClick={() => removeFromCart(item.product._id)}
              className="text-red-500"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={clearCart}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Clear Cart
        </button>
        <div>
          <p className="text-lg font-semibold">Total: ₹{total.toFixed(2)}</p>
          <button
            onClick={handleCheckout}
            className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;