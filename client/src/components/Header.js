import React from 'react';
import { Container, Navbar, Nav, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiUser } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { remAuth } from './Actions';
import '../styles.css';

const Header = () => {
  const { products: cartItems } = useSelector(state => state.productReducer);
  const authState = useSelector(state => state.AuthReducer);
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(remAuth());
  };

  // Safely calculate cart item count
  const cartItemCount = Array.isArray(cartItems) 
    ? cartItems.reduce((total, item) => total + (item.proCount || 0), 0)
    : 0;

  return (
    <Navbar bg="white" expand="lg" sticky="top" className="shadow-sm py-3">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-4 text-primary">
          LaptopStore
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="px-3 text-dark hover:text-primary transition">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className="px-3 text-dark hover:text-primary transition">
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" className="px-3 text-dark hover:text-primary transition">
              Contact
            </Nav.Link>
          </Nav>
          
          <Nav className="align-items-center">
            <Nav.Link as={Link} to="/cart" className="position-relative mx-3 p-2">
              <FiShoppingCart size={20} className="text-dark hover:text-primary transition" />
              {cartItemCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartItemCount}
                </span>
              )}
            </Nav.Link>
            
            {authState.length > 0 ? (
              <Button 
                variant="outline-danger" 
                onClick={handleLogout}
                className="ms-3"
              >
                Logout
              </Button>
            ) : (
              <Nav.Link 
                as={Link} 
                to="/login" 
                className="ms-3 btn btn-primary px-4 py-2"
              >
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;