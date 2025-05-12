import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { CartProvider } from './context/CartContext';
import App from './App.jsx'
// index.jsx or App.jsx
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')).render(
    <CartProvider>
    <App />
  </CartProvider>
)
