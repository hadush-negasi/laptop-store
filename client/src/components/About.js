import React from 'react';
import { Container } from 'react-bootstrap';
import '../styles.css';

const About = () => {
  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold mb-4">About LaptopStore</h1>
        <p className="lead text-muted max-w-3xl mx-auto">
          Your trusted destination for premium laptops and exceptional service
        </p>
      </div>
      
      <div className="row g-4">
        <div className="col-md-6">
          <div className="bg-white p-4 p-lg-5 rounded-3 shadow-sm h-100">
            <h3 className="mb-4 fw-bold">Our Story</h3>
            <p className="text-muted">
              Founded in 2023, LaptopStore began with a simple mission: to provide high-quality laptops 
              at competitive prices with outstanding customer service. What started as a small online shop 
              has grown into one of the most trusted names in laptop retail.
            </p>
            <p className="text-muted mt-3">
              We carefully select each product in our inventory, ensuring they meet our strict standards 
              for performance, reliability, and value. Our team of tech enthusiasts is always here to 
              help you find the perfect laptop for your needs.
            </p>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="bg-white p-4 p-lg-5 rounded-3 shadow-sm h-100">
            <h3 className="mb-4 fw-bold">Why Choose Us?</h3>
            <ul className="text-muted list-unstyled">
              <li className="mb-3 d-flex">
                <span className="me-2 text-primary">✓</span>
                <span>Genuine products with manufacturer warranties</span>
              </li>
              <li className="mb-3 d-flex">
                <span className="me-2 text-primary">✓</span>
                <span>Competitive prices with regular discounts</span>
              </li>
              <li className="mb-3 d-flex">
                <span className="me-2 text-primary">✓</span>
                <span>Fast and reliable shipping</span>
              </li>
              <li className="mb-3 d-flex">
                <span className="me-2 text-primary">✓</span>
                <span>Knowledgeable customer support</span>
              </li>
              <li className="d-flex">
                <span className="me-2 text-primary">✓</span>
                <span>Easy returns and exchanges</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default About;