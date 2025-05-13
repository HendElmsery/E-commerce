import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Home() {
  const [allProducts, setAllProducts] = useState([]);

  // Fetch all products
  async function fetchAllProducts() {
    try {
      const { data } = await axios.get('https://fakestoreapi.com/products?limit=20');
      setAllProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Sidebar for categories */}
        <div className="col-md-3">
          <div className="sticky-top">
            <h5 className="mb-3">Categories</h5>
            <div className="d-grid gap-2">
              <Link to="/shop" className="btn btn-outline-dark btn-sm">All</Link>
              <Link to="/shop/category/women's clothing" className="btn btn-outline-dark btn-sm">Women's Clothing</Link>
              <Link to="/shop/category/men's clothing" className="btn btn-outline-dark btn-sm">Men's Clothing</Link>
              <Link to="/shop/category/jewelery" className="btn btn-outline-dark btn-sm">Jewelery</Link>
              <Link to="/shop/category/electronics" className="btn btn-outline-dark btn-sm">Electronics</Link>
            </div>
          </div>
        </div>

        {/* Product preview grid */}
        <div className="col-md-9">
          <h3 className="mb-4">Featured Products</h3>
          <div className="row gy-4">
            {allProducts.map((product) => (
              <div key={product.id} className="col-sm-6 col-md-4">
                <div className="card h-100 p-2">
                  <Link to={`/shop/category/${product.category}`}>
                    <img src={product.image} alt={product.title} className="card-img-top p-3" style={{ height: '200px', objectFit: 'contain' }} />
                  </Link>
                  <div className="card-body">
                    <h6 className="card-title">{product.title.slice(0, 50)}...</h6>
                    <p className="card-text">${product.price}</p>
                    <Link to={`/shop/category/${product.category}`} className="btn btn-sm btn-outline-primary">
                      View More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
