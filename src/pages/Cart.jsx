

// Cart.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
function Cart() {
  const {
    cart,
    handleIncrement,
    handleDecrement,
    handleRemove,
    getTotalPrice,
  } = useCart();

  return (
    <div>
      {/* <h1>Your Cart</h1> */}
      {Object.keys(cart).length === 0 ? (
        <div className="container w-80 m-auto border p-5 mb-2">
             <p>Your cart is empty.</p>
        </div>
       
      ) : (
        Object.keys(cart).map((productId) => {
          const product = cart[productId];
          return (
            <div className="container w-80 m-auto border p-5 mb-2">
              <div key={product.id} className="cart-item  ">
                <img src={product.image} alt={product.title} width="100" />
                <h3>{product.title}</h3>
                <p>Price: ${product.price}</p>
                <p>Quantity: {product.count}</p>
                <button
                  className="btn btn-outline"
                  onClick={() => handleIncrement(product.id)}
                >
                  +
                </button>
                <button
                  className="btn btn-outline"
                  onClick={() => handleDecrement(product.id)}
                >
                  -
                </button>
                <button
                  className="btn btn-outline color-red"
                  onClick={() => handleRemove(product.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })
      )}
      {Object.keys(cart).length > 0 && (
        <div>
          <h3>Total: ${getTotalPrice().toFixed(2)}</h3>
          <Link to="/Shop">
            <button className="btn btn-info">Continue Shopping</button>
          </Link>
          <Link to ="/checkout">
          <button className="btn btn-dark mx-2">Check Out</button>
          </Link>
          
        </div>
      )}
    </div>
  );
}

export default Cart;
