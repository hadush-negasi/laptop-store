import React, { useState, useEffect } from 'react';
import Products from './Products';
import { useLocation } from 'react-router-dom';
const API_BASE = process.env.REACT_APP_API_BASE_URL

const SearchProduct = () => {
  const { search } = useLocation();
  // input state for mongodb filters
  const [filters, setFilters] = useState({
    query: '',
    ram: '',
    os: '',
    minPrice: '',
    maxPrice: ''
  });

  // input state for form collection
  const [formState, setFormState] = useState({
    query: '',
    ram: '',
    os: '',
    minPrice: '',
    maxPrice: ''
  });

  useEffect(() => {
    const params = new URLSearchParams(search);
    setFilters({
      query: params.get('query') || '',
      ram: '',
      os: '',
      minPrice: '',
      maxPrice: ''
    });
  }, [search]);

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchFilteredProducts = async (pageNum = 1, append = false) => {
    const isAllEmpty = Object.values(filters).every(val => val === '');

    if (isAllEmpty) {
      console.log('Filters are empty — skipping backend fetch');
      return;
    }

    const queryParams = new URLSearchParams({ ...filters, page: pageNum, limit: 20 }).toString();
    const res = await fetch(`${API_BASE}/api/products/search?${queryParams}`);
    const data = await res.json();

    if (append) {
      setProducts(prev => [...prev, ...data.products]);
    } else {
      setProducts(data.products);
      setPage(1); // reset page for new search
    }

    setTotal(data.total);
  };


  useEffect(() => {
    fetchFilteredProducts();
  }, [filters]);

  const loadMore = () => {
    const nextPage = page + 1;
    setLoadingMore(true);
    fetchFilteredProducts(nextPage, true).then(() => {
      setPage(nextPage);
      setLoadingMore(false);
    });
  };


  const handleSearch = (e) => {
    e.preventDefault();
    setFilters(formState);
  };

  return (
    <div className="d-flex">
      {/* Sidebar Filter Form */}
      <div
        style={{
          width: '280px',
          backgroundColor: '#f9f9f9',
          borderRight: '1px solid #ddd',
          padding: '20px',
          boxShadow: '2px 0 8px rgba(0,0,0,0.05)'
        }}
      >
        <h5 className="mb-3 text-primary">🔍 Advanced Filters</h5>
        <p className="text-muted mb-4" style={{ fontSize: '0.9rem' }}>
          Search laptops by name, RAM, OS, or price range. Click "Search" to apply filters.
        </p>
      
        <form onSubmit={handleSearch} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label className="form-label">Name / Keyword</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g., HP Pavilion"
              value={formState.query}
              onChange={(e) => setFormState({ ...formState, query: e.target.value })}
            />
          </div>
      
          <div>
            <label className="form-label">RAM</label>
            <select
              className="form-select"
              value={formState.ram}
              onChange={(e) => setFormState({ ...formState, ram: e.target.value })}
            >
              <option value="">Any RAM</option>
              <option value="8 GB">8 GB</option>
              <option value="16 GB">16 GB</option>
              <option value="32 GB">32 GB</option>
            </select>
          </div>
      
          <div>
            <label className="form-label">Operating System</label>
            <select
              className="form-select"
              value={formState.os}
              onChange={(e) => setFormState({ ...formState, os: e.target.value })}
            >
              <option value="">Any OS</option>
              <option value="Windows">Windows</option>
              <option value="macOS">macOS</option>
              <option value="Linux">Linux</option>
            </select>
          </div>
      
          <div className="d-flex gap-2">
            <div>
              <label className="form-label">Min Price</label>
              <input
                type="number"
                className="form-control"
                placeholder="0"
                value={formState.minPrice}
                onChange={(e) => setFormState({ ...formState, minPrice: e.target.value })}
              />
            </div>
            <div>
              <label className="form-label">Max Price</label>
              <input
                type="number"
                className="form-control"
                placeholder="e.g., 2000"
                value={formState.maxPrice}
                onChange={(e) => setFormState({ ...formState, maxPrice: e.target.value })}
              />
            </div>
          </div>
      
          <button type="submit" className="btn btn-primary mt-2">Search</button>
        </form>
      </div>


      {/* Products Grid */}
      {products.length === 0 && Object.values(filters).every(val => val === '') && (
        <p className="text-muted text-center">Use the filters on the left to begin searching for laptops.</p>
      )}
      <div className="flex-grow-1 p-4">
        <Products products={products} source="search" />
      {products.length < total && (
        <div className="text-center mt-4">
          <button
            className="btn btn-outline-primary"
            onClick={loadMore}
            disabled={loadingMore}
          >
            {loadingMore ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
      </div>
    </div>
  );
};

export default SearchProduct;
