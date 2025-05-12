import React from "react";
import Navbar from "./Navbar";
Navbar
const Header = () => {
  return (
    <div>
    <Navbar/>
      <header
        className="header bg-cover bg-center text-white py-5"
        style={{
          backgroundImage: `url('../lola-rose-840tjesh9ww-unsplash.jpg')`, // Add your background image URL here
        }}
      >
        <div className="container text-center">
          <h1 className="display-4">Welcome to My E-Commerce App</h1>
          <p className="lead">Find the best products at amazing prices.</p>
          {/* <a href="../lola-rose-840tjesh9ww-unsplash.jpg" className="btn btn-primary btn-lg">
    Start Shopping
  </a> */}
        </div>
      </header>
    </div>
  );
};

export default Header;
