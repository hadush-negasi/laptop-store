import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { add, remove } from './Actions';
import '../styles.css';

const Cart = () => {
  const store = useSelector(state => state.productReducer.products) || [];
  const dispatch = useDispatch();
  
  let newStore = [...store].map(item => ({
    ...item,
    total: item.price * item.proCount
  }));
  
  let total = newStore.reduce((sum, item) => sum + item.total, 0);

  const handleAdd = (prod) => {
    dispatch(add(prod));
  };

  const handleDel = (prod) => {
    dispatch(remove(prod));
  };

  return (
    <Container className="py-5">
      <h1 className="text-center mb-5 fw-bold">Your Shopping Cart</h1>
      
      <Row className="g-4">
        <Col lg={8}>
          {newStore.length === 0 ? (
            <div className="text-center py-5">
              <h4 className="text-muted">Your cart is empty</h4>
              <Button href="/" variant="primary" className="mt-3">
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="bg-white rounded-3 shadow-sm p-4">
              {newStore.map((item, index) => (
                <div key={index} className="d-flex border-bottom pb-3 mb-3 align-items-center">
                  <div className="me-3" style={{ width: '80px' }}>
                    <img 
                      src={item.img_link} 
                      alt={item.name}
                      className="img-fluid rounded-2"
                    />
                  </div>
                  <div className="flex-grow-1">
                    <h5 className="mb-1">{item.name}</h5>
                    <div className="d-flex align-items-center">
                      <span className="fw-bold text-primary me-3">₹{item.price}</span>
                      <div className="d-flex align-items-center">
                        <Button 
                          variant="outline-secondary" 
                          size="sm" 
                          onClick={() => handleDel(item)}
                          className="px-2 py-0"
                        >
                          -
                        </Button>
                        <Badge bg="light" text="dark" className="mx-2 px-2 py-1">
                          {item.proCount}
                        </Badge>
                        <Button 
                          variant="outline-secondary" 
                          size="sm" 
                          onClick={() => handleAdd(item)}
                          className="px-2 py-0"
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="text-end" style={{ width: '100px' }}>
                    <span className="fw-bold">₹{item.total}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Col>
        
        <Col lg={4}>
          <Card className="shadow-sm border-0 sticky-top" style={{ top: '20px' }}>
            <Card.Body>
              <Card.Title className="fw-bold mb-4">Order Summary</Card.Title>
              
              {newStore.map((item, index) => (
                <div key={index} className="d-flex justify-content-between mb-2">
                  <span>
                    {item.name} <small className="text-muted">(x{item.proCount})</small>
                  </span>
                  <span>₹{item.total}</span>
                </div>
              ))}
              
              <hr className="my-3" />
              
              <div className="d-flex justify-content-between fw-bold fs-5 mb-4">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
              
              <Button 
                variant="primary" 
                size="lg" 
                className="w-100"
                disabled={newStore.length === 0}
              >
                Proceed to Checkout
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;