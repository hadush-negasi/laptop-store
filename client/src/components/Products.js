import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FiShoppingCart } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { add } from './Actions';
import { Link } from 'react-router-dom';
import "../styles.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log('Error fetching products:', err);
        setLoading(false);
      });
  }, []);

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
        {products.map((product) => (
          <Col key={product.id}>
            <Card className="h-100 border-0 shadow-sm hover-shadow transition cursor-pointer">
              <Link to={`/products/${product._id}`} className="text-decoration-none">
                <div className="ratio ratio-1x1 bg-light">
                  <Card.Img 
                    variant="top" 
                    src={product.image} 
                    className="object-fit-contain p-3"
                  />
                </div>
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="fw-bold mb-2 text-dark">{product.name}</Card.Title>
                  <Card.Text className="text-muted small mb-3 flex-grow-1">
                    {product.description.substring(0, 60)}...
                  </Card.Text>
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
    </Container>
  );
};

export default Products;