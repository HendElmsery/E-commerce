import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';

function Shop() {
  const { category } = useParams();
  const navigate = useNavigate();
  const { cart, addToCart, handleIncrement, handleDecrement, handleRemove } = useCart();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [rating, setRating] = useState(0);

  const PRODUCTS_PER_PAGE = 8;

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchQuery), 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch categories
  useEffect(() => {
    axios.get('https://fakestoreapi.com/products/categories')
      .then(res => setCategories(res.data));
  }, []);

  // Fetch products
  useEffect(() => {
    const url = category
      ? `https://fakestoreapi.com/products/category/${category}`
      : `https://fakestoreapi.com/products`;

    axios.get(url).then(res => {
      setProducts(res.data);
      setFilteredProducts(res.data);
    });
  }, [category]);

  // Filter and sort products
  useEffect(() => {
    let result = [...products];

    // Search
    if (debouncedSearch) {
      result = result.filter(p =>
        p.title.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }

    // Price filter
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Rating filter
    if (rating > 0) {
      result = result.filter(p => Math.floor(p.rating?.rate || 0) >= rating);
    }

    // Sort
    switch (sortOrder) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'title':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'rating':
        result.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      default:
        break;
    }

    setFilteredProducts(result);
    setCurrentPage(1);
  }, [debouncedSearch, sortOrder, products, priceRange, rating]);

  const indexOfLast = currentPage * PRODUCTS_PER_PAGE;
  const indexOfFirst = indexOfLast - PRODUCTS_PER_PAGE;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  const handleCategorySelect = (cat) => {
    navigate(cat === 'all' ? '/shop' : `/shop/category/${cat}`);
  };

  return (
    <div className="container-fluid py-4">
      <div className="row">
        {/* Sidebar */}
        <div className="col-lg-3 mb-4">
          <div className="bg-light p-4 rounded shadow-sm sticky-top" style={{ top: 80 }}>
            <h5 className="mb-3">Filters</h5>

            <div className="mb-3">
              <label className="form-label fw-bold">Category</label>
              <ul className="list-group">
                <li
                  className={`list-group-item ${!category ? 'active' : ''}`}
                  onClick={() => handleCategorySelect('all')}
                  style={{ cursor: 'pointer' }}
                >
                  All
                </li>
                {categories.map((cat) => (
                  <li
                    key={cat}
                    className={`list-group-item ${category === cat ? 'active' : ''}`}
                    onClick={() => handleCategorySelect(cat)}
                    style={{ cursor: 'pointer', textTransform: 'capitalize' }}
                  >
                    {cat}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Price Range</label>
              <input
                type="range"
                className="form-range"
                min="0"
                max="1000"
                step="10"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
              />
              <small className="text-muted">Max: ${priceRange[1]}</small>
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Rating</label>
              {[5, 4, 3, 2, 1].map(r => (
                <div key={r} className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="rating"
                    id={`rating${r}`}
                    checked={rating === r}
                    onChange={() => setRating(r)}
                  />
                  <label className="form-check-label" htmlFor={`rating${r}`}>
                    {'★'.repeat(r)} & up
                  </label>
                </div>
              ))}
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="rating"
                  id="allRating"
                  checked={rating === 0}
                  onChange={() => setRating(0)}
                />
                <label className="form-check-label" htmlFor="allRating">All Ratings</label>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-lg-9">
          {/* Search and Sort */}
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <input
                type="text"
                placeholder="🔍 Search products..."
                className="form-control"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <select
                className="form-select"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="">Sort by</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
                <option value="title">Title: A → Z</option>
                <option value="rating">Rating: High → Low</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="row g-4">
            {currentProducts.map(product => (
              <div key={product.id} className="col-sm-6 col-lg-4">
                <div className="card h-100 shadow-sm border-0">
                  <img
                    src={product.image}
                    className="card-img-top p-3"
                    alt={product.title}
                    style={{ height: '220px', objectFit: 'contain' }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h6 className="card-title">{product.title.slice(0, 50)}</h6>
                    <p className="text-muted mb-2">${product.price.toFixed(2)}</p>
                    <p className="card-text small flex-grow-1">{product.description.slice(0, 80)}...</p>

                    {!cart[product.id] ? (
                      <button className="btn btn-success btn-sm mt-auto" onClick={() => addToCart(product)}>
                        Add to Cart
                      </button>
                    ) : (
                      <div className="mt-2">
                        <p className="mb-1">Qty: {cart[product.id].count}</p>
                        <div className="btn-group btn-group-sm">
                          <button className="btn btn-outline-secondary" onClick={() => handleDecrement(product.id)}>-</button>
                          <button className="btn btn-outline-secondary" onClick={() => handleIncrement(product.id)}>+</button>
                          <button className="btn btn-outline-danger" onClick={() => handleRemove(product.id)}>🗑️</button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav className="d-flex justify-content-center mt-4">
              <ul className="pagination">
                {[...Array(totalPages)].map((_, i) => (
                  <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                      {i + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {/* Go to Cart */}
          <div className="text-center mt-4">
            <Link to="/cart" className="btn btn-primary px-4 py-2">
              🛒 Go to Cart ({Object.keys(cart).length})
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;
