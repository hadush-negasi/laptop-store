import React, { useState } from 'react';
import axios from 'axios';
import { Button, Card, Container, Form, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addAuth } from './Actions';
import '../styles.css';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [userPass, setUserPass] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const storeToken = useSelector(state => state.AuthReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', {
        uname: userName,
        password: userPass
      });
      
      if (res.data.token) {
        localStorage.setItem('token', JSON.stringify(res.data.token));
        dispatch(addAuth({ uname: res.data.user }));
        navigate('/');
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (storeToken.length > 0) {
    return (
      <Container className="py-5">
        <Card className="border-0 shadow-sm mx-auto" style={{ maxWidth: '500px' }}>
          <Card.Body className="text-center p-5">
            <h3 className="mb-4">You're already logged in</h3>
            <Link to="/" className="btn btn-primary px-4">
              Continue Shopping
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
          <h2 className="text-center mb-4 fw-bold">Login</h2>
          
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={userPass}
                onChange={(e) => setUserPass(e.target.value)}
                required
              />
            </Form.Group>
            
            <Button 
              variant="primary" 
              type="submit" 
              className="w-100 py-2 mb-3"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
            
            <div className="text-center">
              <small className="text-muted">
                Don't have an account?{' '}
                <Link to="/register" className="text-primary">
                  Register here
                </Link>
              </small>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;