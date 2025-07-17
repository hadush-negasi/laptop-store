import React, { useState } from 'react';
import { Button, Card, Container, Form, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; // make sure this points to your Firebase config
import '../styles.css';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [userPass, setUserPass] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, userPass);
      const user = userCredential.user;

      // ✅ Optional: Store token or UID in localStorage
      const token = await user.getIdToken();
      localStorage.setItem('token', token);
      localStorage.setItem('uid', user.uid);

      // fetch user info from mongodb using firebase uid
      const res = await axios.get(`http://localhost:5000/api/users/${user.uid}`);
      localStorage.setItem('user', JSON.stringify(res.data));

      navigate('/');
    } catch (err) {
      console.error(err);
      setError(err.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <Card className="border-0 shadow-sm mx-auto" style={{ maxWidth: '500px' }}>
        <Card.Body className="p-4 p-md-5">
          <h2 className="text-center mb-4 fw-bold">Login</h2>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
