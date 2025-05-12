import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./pages/Header"; // Assuming Header is in this path
import Home from "./pages/Home"; // Create this component
import Shop from "./pages/Shop"; // Create this component
import Contact from "./pages/Contact"; // Create this component

function App() {
  return (
    <Router>
      <Header /> The header with navbar is always visible

      <div className="container">
        <Routes>
          {/* Define each route here */}
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
