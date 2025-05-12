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
    <div className="container py-5">
      <h1 className="text-center mb-4">🛍️ Our Products</h1>
      <div className="row justify-content-center">
        {products.map((product) => (
          <div key={product.id} className="col-sm-6 col-md-4 col-lg-3 mb-4">
            <div className="card h-100 shadow-sm">
              <img
                src={product.image}
                className="card-img-top p-3"
                alt={product.title}
                style={{ height: '200px', objectFit: 'contain' }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.title.slice(0, 40)}...</h5>
                <p className="text-muted mb-2">${product.price.toFixed(2)}</p>
                <p className="card-text small flex-grow-1">{product.description.slice(0, 80)}...</p>

                {!cart[product.id] ? (
                  <button
                    className="btn btn-primary mt-3"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                ) : (
                  <div className="mt-3">
                    <p className="mb-1">Quantity: {cart[product.id].count}</p>
                    <div className="btn-group" role="group">
                      <button className="btn btn-outline-secondary" onClick={() => handleDecrement(product.id)}>-</button>
                      <button className="btn btn-outline-secondary" onClick={() => handleIncrement(product.id)}>+</button>
                      <button className="btn btn-outline-danger" onClick={() => handleRemove(product.id)}>Remove</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-4">
        <Link to="/cart" className="btn btn-success px-4 py-2">
          Go to Cart ({Object.keys(cart).length})
        </Link>
      </div>
    </div>
  );
}

export default Shop;
