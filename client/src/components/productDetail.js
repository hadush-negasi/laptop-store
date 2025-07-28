import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Container, Row, Col, Badge, Spinner } from 'react-bootstrap';
import { FiShoppingCart } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { add, setProductDetail } from './Actions';
import axios from 'axios';

const ProductDetail = () => {
  const API_BASE = process.env.REACT_APP_API_BASE_URL;
  const { id } = useParams();
  console.log("current product id: ", id);
  const dispatch = useDispatch();
  const { productDetail } = useSelector(state => state.productReducer);
  const { products: cartItems } = useSelector(state => state.productReducer);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${API_BASE}/api/products/${id}`);
        dispatch(setProductDetail(response.data));
      } catch (error) {
        console.error('Error fetching product:', error);
        dispatch(setProductDetail(null));
      }
    };

    fetchProduct();
  }, [API_BASE,id, dispatch]);

  const addToCart = () => {
    if (productDetail) {
      dispatch(add(productDetail));
    }
  };

  const productInCart = cartItems.find(item => item._id === id);
  const cartQuantity = productInCart ? productInCart.proCount : 0;

  if (productDetail === null) {
    return (
      <Container className="py-5 text-center">
        <h4>Product not found</h4>
      </Container>
    );
  }

  if (!productDetail) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  const {
    name,
    price,
    processor,
    ram,
    os,
    storage,
    display,
    rating,
    no_of_ratings,
    no_of_reviews,
    img_link,
  } = productDetail;

  const brand = name.split(" ")[0];

  return (
    <Container className="py-5">
      <Row className="g-4">
        <Col lg={6}>
          <div className="bg-white p-4 rounded-3 shadow-sm">
            <img 
              src={img_link} 
              alt={name}
              className="img-fluid rounded-3"
            />
          </div>
        </Col>

        <Col lg={6}>
          <div className="bg-white p-4 rounded-3 shadow-sm h-100">
            <h1 className="mb-3 fw-bold">{name}</h1>

            <div className="d-flex align-items-center mb-3">
              <Badge bg="primary" className="me-2">{brand}</Badge>
              <div className="text-warning">
                ★ {rating || 0} ({no_of_reviews || 0} reviews)
              </div>
            </div>

            <h2 className="text-primary mb-4">₹{price}</h2>

            <div className="mb-4">
              <h5 className="fw-bold mb-3">Specifications</h5>
              <ul className="list-unstyled">
                <li className="mb-2"><strong>Brand:</strong> {brand}</li>
                <li className="mb-2"><strong>Processor:</strong> {processor || 'N/A'}</li>
                <li className="mb-2"><strong>RAM:</strong> {ram || 'N/A'}</li>
                <li className="mb-2"><strong>OS:</strong> {os || 'N/A'}</li>
                <li className="mb-2"><strong>Storage:</strong> {storage || 'N/A'}</li>
                <li className="mb-2"><strong>Display:</strong> {display || 'N/A'}</li>
                <li className="mb-2"><strong>Ratings Count:</strong> {no_of_ratings || 0}</li>
              </ul>
            </div>

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
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
