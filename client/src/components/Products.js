import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FiShoppingCart } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { add } from './Actions';
import { Link } from 'react-router-dom';
import "../styles.css";

const Products = () => {
  const API_BASE = process.env.REACT_APP_API_BASE_URL;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);

  const dispatch = useDispatch();

 const fetchProducts = useCallback(async (pageNum = 1) => {
  try {
    const res = await axios.get(`${API_BASE}/api/products?page=${pageNum}&limit=20`);
    return res.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return { products: [], total: 0 };
  }
}, [API_BASE]);

  useEffect(() => {
    // Initial fetch
    fetchProducts().then(data => {
      setProducts(data.products);
      setTotal(data.total);
      setLoading(false);
    });
  }, [fetchProducts]);

  const loadMore = () => {
    setLoadingMore(true);
    const nextPage = page + 1;
    fetchProducts(nextPage).then(data => {
      setProducts(prev => [...prev, ...data.products]);
      setPage(nextPage);
      setLoadingMore(false);
    });
  };

  const addCart = (product) => {
    dispatch(add(product));
  };

  if (loading) {
    return (
      <Container className="py-5">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h1 className="text-center mb-5 fw-bold">Our Products</h1>

      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {products.map(product => (
          <Col key={product._id}>
            <Card className="h-100 border-0 shadow-sm hover-shadow transition cursor-pointer">
              <Link to={`/products/${product._id}`} className="text-decoration-none">
                <div className="ratio ratio-1x1 bg-light">
                  <Card.Img
                    variant="top"
                    src={product.img_link || product.image} // Adjust field name if needed
                    className="object-fit-contain p-3"
                  />
                </div>
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="fw-bold mb-2 text-dark">{product.name}</Card.Title>
                </Card.Body>
              </Link>

              <div className="d-flex justify-content-between align-items-center px-3 pb-3">
                <span className="fw-bold text-primary fs-5">₹{product.price}</span>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => addCart(product)}
                  className="rounded-circle p-2"
                >
                  <FiShoppingCart size={18} />
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Load More Button */}
      {products.length < total && (
        <div className="text-center mt-4">
          <Button onClick={loadMore} disabled={loadingMore}>
            {loadingMore ? 'Loading...' : 'Load More'}
          </Button>
        </div>
      )}
    </Container>
  );
};

export default Products;
