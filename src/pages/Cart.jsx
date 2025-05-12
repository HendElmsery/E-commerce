// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// function Cart(increment) {
//   const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || {}); // Load from localStorage
  
//   const handleIncrement = (productId) => {
//     const newCart = { ...cart };
//     newCart[productId].count += 1;
//     setCart(newCart);
//     localStorage.setItem('cart', JSON.stringify(newCart));
//   };
// const handleDecrement = (productId) => {
//     const newCart = { ...cart };
//     if (newCart[productId].count > 1) {
//       newCart[productId].count -= 1;
//     }
//     setCart(newCart);
//     localStorage.setItem('cart', JSON.stringify(newCart));
//   };

//   const handleRemove = (productId) => {
//     const newCart = { ...cart };
//     delete newCart[productId];
//     setCart(newCart);
//     localStorage.setItem('cart', JSON.stringify(newCart));
//   };

//   const getTotalPrice = () => {
//     return Object.values(cart).reduce((total, product) => total + product.price * product.count, 0);
//   };

//   return (
//     <div>
//       <h1>Your Cart</h1>
//       {Object.keys(cart).length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         Object.keys(cart).map((productId) => {
//           const product = cart[productId];
//           return (
//             <div key={product.id} className="cart-item">
//               <img src={product.image} alt={product.title} width="100" />
//               <h3>{product.title}</h3>
//               <p>Price: ${product.price}</p>
//               <p>Quantity: {product.count}</p>
//               <button onClick={() => handleIncrement(product.id)}>+</button>
//               <button onClick={() => handleDecrement(product.id)}>-</button>
//               <button onClick={() => handleRemove(product.id)}>Remove</button>
//             </div>
//           );
//         })
//       )}
//       {Object.keys(cart).length > 0 && (
//         <div>
//           <h3>Total: ${getTotalPrice()}</h3>
//           <Link to="/">
//             <button>Continue Shopping</button>
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Cart;

// Cart.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Cart() {
  const { cart, handleIncrement, handleDecrement, handleRemove, getTotalPrice } = useCart();

  return (
    <div>
      <h1>Your Cart</h1>
      {Object.keys(cart).length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        Object.keys(cart).map((productId) => {
          const product = cart[productId];
          return (
            <div key={product.id} className="cart-item">
              <img src={product.image} alt={product.title} width="100" />
              <h3>{product.title}</h3>
              <p>Price: ${product.price}</p>
              <p>Quantity: {product.count}</p>
              <button onClick={() => handleIncrement(product.id)}>+</button>
              <button onClick={() => handleDecrement(product.id)}>-</button>
              <button onClick={() => handleRemove(product.id)}>Remove</button>
            </div>
          );
        })
      )}
      {Object.keys(cart).length > 0 && (
        <div>
          <h3>Total: ${getTotalPrice().toFixed(2)}</h3>
          <Link to="/">
            <button>Continue Shopping</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Cart;
