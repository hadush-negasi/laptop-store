import React from 'react';
import { Container, Navbar, Nav, Button, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiUser } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { remAuth } from './Actions';
import '../styles.css';

const Header = () => {
  const { products: cartItems } = useSelector(state => state.productReducer);
  const authState = useSelector(state => state.AuthReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const isLoggedIn = token !== null;
  const user = JSON.parse(localStorage.getItem('user')); // optional

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

            {isLoggedIn ? (
              <Nav.Link as={Link} to="/account" className="ms-3 d-flex align-items-center gap-1">
                <FiUser size={18} />
                Account
              </Nav.Link>
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
