import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <>
      <Navbar />
      <header
        className="d-flex align-items-center justify-content-center text-white"
        style={{
          height: "75vh",
          background: "linear-gradient(135deg, #6f42c1, #b97aff)",
        }}
      >
        <div className="text-center px-4">
          <h1 className="display-3 fw-bold mb-3">
            Welcome to StyleHub
          </h1>
          <p className="lead mb-4">
            Shop the latest fashion & tech at unbeatable prices.
          </p>
          <Link to ="shop">
          <button href="#shop" className="btn btn-lg btn-light text-dark px-5 py-2 rounded-pill shadow-sm">
            Explore Now
          </button>
          
          </Link>
          
        </div>
      </header>
    </>
  );
};

export default Header;
