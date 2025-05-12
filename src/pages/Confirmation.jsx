import React from 'react';
import { useLocation, Link } from 'react-router-dom';

function Confirmation() {
  const location = useLocation();
  const userName = location.state?.name || 'Customer';

  return (
    <div className="container mt-5 text-center">
      <h2>Thank you, {userName}!</h2>
      <p>Your order has been placed successfully.</p>
      <Link to="/">
        <button className="btn btn-primary mt-3">Back to Shop</button>
      </Link>
    </div>
  );
}

export default Confirmation;
