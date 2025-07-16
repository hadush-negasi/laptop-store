import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Container, Row, Col, Card, Badge, Spinner } from 'react-bootstrap';
import { FiShoppingCart } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { add, setProductDetail } from './Actions';
import axios from 'axios';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { productDetail } = useSelector(state => state.productReducer);
  const { products: cartItems } = useSelector(state => state.productReducer);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        dispatch(setProductDetail(response.data));
      } catch (error) {
        console.error('Error fetching product:', error);
        dispatch(setProductDetail(null));
      }
    };

    fetchProduct();
  }, [id, dispatch]);

  const addToCart = () => {
    if (productDetail) {
      dispatch(add(productDetail));
    }
  };

  const productInCart = cartItems.find(item => item.id === id);
  const cartQuantity = productInCart ? productInCart.proCount : 0;

  if (!productDetail) {
    return (
      <Container className="py-5 text-center">
        {productDetail === null ? (
          <h4>Product not found</h4>
        ) : (
          <Spinner animation="border" variant="primary" />
        )}
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="g-4">
        <Col lg={6}>
          <div className="bg-white p-4 rounded-3 shadow-sm">
            <img 
              src={productDetail.image} 
              alt={productDetail.name}
              className="img-fluid rounded-3"
            />
          </div>
        </Col>
        
        <Col lg={6}>
          <div className="bg-white p-4 rounded-3 shadow-sm h-100">
            <h1 className="mb-3 fw-bold">{productDetail.name}</h1>
            <div className="d-flex align-items-center mb-3">
              <Badge bg="primary" className="me-2">New</Badge>
              <div className="text-warning">
                ★★★★★ (24 reviews)
              </div>
            </div>
            
            <h2 className="text-primary mb-4">₹{productDetail.price}</h2>
            
            <p className="mb-4">{productDetail.description}</p>
            
            <div className="mb-4">
              <h5 className="fw-bold mb-3">Specifications</h5>
              <ul className="list-unstyled">
                <li className="mb-2"><strong>Brand:</strong> {productDetail.brand || 'N/A'}</li>
                <li className="mb-2"><strong>Processor:</strong> {productDetail.processor || 'N/A'}</li>
                <li className="mb-2"><strong>RAM:</strong> {productDetail.ram || 'N/A'}</li>
                <li className="mb-2"><strong>Storage:</strong> {productDetail.storage || 'N/A'}</li>
              </ul>
            </div>
            
            <div className="d-flex align-items-center">
              <Button 
                variant="primary" 
                size="lg" 
                className="py-3 flex-grow-1"
                onClick={addToCart}
              >
                <FiShoppingCart className="me-2" />
                Add to Cart {cartQuantity > 0 && `(${cartQuantity})`}
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;