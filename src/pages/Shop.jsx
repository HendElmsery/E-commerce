// 
// Shop.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Shop() {
  const [products, setProducts] = useState([]);
  const { cart, addToCart, handleIncrement, handleDecrement, handleRemove } = useCart();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div>
      <h1>Shop</h1>
      <div className="products row">
        {products.map((product) => (
          <div key={product.id} className="product-card col-md-4 card">
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <button className="btn btn-primary" onClick={() => addToCart(product)}>
              Add to Cart
            </button>
            {cart[product.id] && (
              <>
                <p>Quantity: {cart[product.id].count}</p>
                <button className="btn" onClick={() => handleIncrement(product.id)}>+</button>
                <button className="btn" onClick={() => handleDecrement(product.id)}>-</button>
                <button className="btn btn-danger" onClick={() => handleRemove(product.id)}>Remove</button>
              </>
            )}
          </div>
        ))}
      </div>
      <Link to="/cart">
        <button className="arrow btn">Go to Cart ({Object.keys(cart).length})</button>
      </Link>
    </div>
  );
}

export default Shop;
