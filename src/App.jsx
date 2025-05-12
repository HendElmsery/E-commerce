import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./pages/Header"; // Assuming Header is in this path
import Home from "./pages/Home"; // Create this component
import Shop from "./pages/Shop"; // Create this component
import Contact from "./pages/Contact"; // Create this component
import Cart from "./pages/Cart";
import Navbar from "./pages/Navbar";
import CheckOut from "./pages/CheckOut";
import Confirmation from "./pages/Confirmation";




function App() {
  return (
    <Router>
      <Header /> 

      <div className="container">
        <Routes>
          {/* Define each route here */}
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/confirmation" element={<Confirmation />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
