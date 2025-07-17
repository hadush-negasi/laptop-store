import React from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Account = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (!token) {
    //console.log(user);
    return (
      <Container className="py-5 text-center">
        <h4>You are not logged in.</h4>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Card className="shadow-sm p-4 mx-auto" style={{ maxWidth: '500px' }}>
        <h3 className="mb-4 text-center">Account Details</h3>
        {user ? (
            <>
                <p><strong>Full Name:</strong> {user.fname} {user.lname}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Country:</strong> {user.country}</p>
                <p><strong>Age:</strong> {user.age}</p>
                <p><strong>Address:</strong> {user.address}</p>
            </>
        ):(
        <div className="text-center text-danger">
          <p>⚠️ Couldn't load user data. Please try logging in again.</p>
        </div>
      )
    }
        <div className="text-center">
          <Button variant="danger" onClick={handleLogout}>Logout</Button>
        </div>  
      </Card>
    </Container>
  );
};

export default Account;
