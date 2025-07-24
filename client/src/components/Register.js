import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; // Adjust the path
import { Container, Button, Form, Card, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles.css';
import axios from 'axios'; // If you're storing extra info in MongoDB

const Register = () => {
  const API_BASE = process.env.REACT_APP_API_BASE_URL;
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fname: '',
    lname: '',
    age: '',
    country: '',
    address: '',
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
    setSuccess(false);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const firebaseUser = userCredential.user;

      // Optionally: send extra user info to your backend (Node/MongoDB)
      const {password, ...userData} = formData; // remove password field before sending it to backend
      await axios.post(`${API_BASE}/api/users/register`, {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        ...userData
      });

      setSuccess(true);
    } catch (err) {
      console.error('Firebase register error:', err);
      setError(err.message || 'Registration failed.');
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
              <Form.Control type="text" name="fname" value={formData.fname} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" name="lname" value={formData.lname} onChange={handleChange} required />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Age</Form.Label>
              <Form.Control type="number" name="age" value={formData.age} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Country</Form.Label>
              <Form.Control type="text" name="country" value={formData.country} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" name="address" value={formData.address} onChange={handleChange} required />
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

            <Button variant="primary" type="submit" className="w-100 py-2 mb-3" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </Button>

            <div className="text-center">
              <small className="text-muted">
                Already have an account? <Link to="/login" className="text-primary">Login here</Link>
              </small>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Register;
