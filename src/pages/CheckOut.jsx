import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import Confirmation from './Confirmation';

function CheckOut() {
  const { cart, getTotalPrice } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    country: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate payment or form submission
    console.log('Order submitted:', formData, cart);
    alert('Payment successful! Thank you for your order.');

    // Optionally clear cart, then redirect
    localStorage.removeItem('cart');
    navigate('/confirmation', { state: { name: formData.name } });
  };

  if (Object.keys(cart).length === 0) {
    return (
      <div className="container mt-5">
        <h2>Your cart is empty.</h2>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2>Checkout</h2>
      <p>Total: ${getTotalPrice().toFixed(2)}</p>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            className="form-control"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            name="address"
            required
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <div className="row">
          <div className="mb-3 col-md-4">
            <label className="form-label">City</label>
            <input
              type="text"
              className="form-control"
              name="city"
              required
              value={formData.city}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 col-md-4">
            <label className="form-label">ZIP Code</label>
            <input
              type="text"
              className="form-control"
              name="zip"
              required
              value={formData.zip}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 col-md-4">
            <label className="form-label">Country</label>
            <input
              type="text"
              className="form-control"
              name="country"
              required
              value={formData.country}
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-success mt-2">
          Place Order & Pay
        </button>
      </form>
    </div>
  );
}

export default CheckOut;
