import React, { useState } from 'react';
import axios from 'axios';
import { Container, Button, Form, Card, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles.css';

const Register = () => {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    uname: '',
    password: '',
    gender: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await axios.post('http://localhost:5000/api/users/register', formData);
      setSuccess(true);
    } catch (err) {
      console.error('Register error:', err);
      setError(err.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Container className="py-5">
        <Card className="border-0 shadow-sm mx-auto" style={{ maxWidth: '500px' }}>
          <Card.Body className="text-center p-5">
            <h3 className="mb-3">Registration Successful!</h3>
            <p className="mb-4">You can now login with your credentials</p>
            <Link to="/login" className="btn btn-primary px-4">
              Go to Login
            </Link>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Card className="border-0 shadow-sm mx-auto" style={{ maxWidth: '500px' }}>
        <Card.Body className="p-4 p-md-5">
          <h2 className="text-center mb-4 fw-bold">Create Account</h2>
          
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Form onSubmit={handleRegister}>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="fname"
                value={formData.fname}
                onChange={handleChange}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lname"
                value={formData.lname}
                onChange={handleChange}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="uname"
                value={formData.uname}
                onChange={handleChange}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-4">
              <Form.Label>Gender</Form.Label>
              <div className="d-flex gap-4">
                <Form.Check
                  type="radio"
                  label="Male"
                  name="gender"
                  value="male"
                  checked={formData.gender === 'male'}
                  onChange={handleChange}
                />
                <Form.Check
                  type="radio"
                  label="Female"
                  name="gender"
                  value="female"
                  checked={formData.gender === 'female'}
                  onChange={handleChange}
                />
              </div>
            </Form.Group>
            
            <Button 
              variant="primary" 
              type="submit" 
              className="w-100 py-2 mb-3"
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </Button>
            
            <div className="text-center">
              <small className="text-muted">
                Already have an account?{' '}
                <Link to="/login" className="text-primary">
                  Login here
                </Link>
              </small>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Register;