import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import '../styles.css';

const Contact = () => {
  return (
    <Container className="py-5">
      <h1 className="text-center fw-bold mb-5">Contact Us</h1>
      
      <Row className="g-4">
        <Col md={6}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="p-4 p-lg-5">
              <h3 className="mb-4 fw-bold">Get in Touch</h3>
              
              <div className="mb-4">
                <div className="d-flex align-items-start mb-3">
                  <FiMail size={20} className="text-primary mt-1 me-3" />
                  <div>
                    <h6 className="mb-1 fw-bold">Email</h6>
                    <p className="text-muted mb-0">hadush7512@gmail.com</p>
                  </div>
                </div>
                
                <div className="d-flex align-items-start mb-3">
                  <FiPhone size={20} className="text-primary mt-1 me-3" />
                  <div>
                    <h6 className="mb-1 fw-bold">Phone</h6>
                    <p className="text-muted mb-0">(+251) 998317320 </p>
                  </div>
                </div>
                
                <div className="d-flex align-items-start">
                  <FiMapPin size={20} className="text-primary mt-1 me-3" />
                  <div>
                    <h6 className="mb-1 fw-bold">Address</h6>
                    <p className="text-muted mb-0">
                      Rajkot-Morbi Road, Rajkot 360 003<br />
                      Gujarat, India
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <h6 className="fw-bold mb-3">Business Hours</h6>
                <p className="text-muted mb-1">Monday - Friday: 9am - 6pm</p>
                <p className="text-muted">Saturday: 10am - 4pm</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="p-4 p-lg-5">
              <h3 className="mb-4 fw-bold">Send Us a Message</h3>
              
              <Form 
                action="https://formsubmit.co/3270b6b54dfaa88bb24c42e15a36db1e" 
                method="POST"
              >
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_next" value="https://yourdomain.com/thank-you" />
                
                <Form.Group className="mb-3">
                  <Form.Label>Your Name</Form.Label>
                  <Form.Control type="text" name="name" required />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control type="email" name="email" required />
                </Form.Group>
                
                <Form.Group className="mb-4">
                  <Form.Label>Message</Form.Label>
                  <Form.Control as="textarea" rows={5} name="message" required />
                </Form.Group>
                
                <Button variant="primary" type="submit" className="w-100 py-2">
                  Send Message
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;