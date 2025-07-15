import React from 'react';
import { useSelector } from 'react-redux';
import Login from './Login';

const Logout = () => {
  const storeLogin = useSelector(state => state.AuthReducer);

  const currentUser = storeLogin.length > 0 ? storeLogin[0] : null;

  return (
    <div>
      {currentUser ? (
        <div>
          <h3>User Details</h3>
          <ul>
            <li><strong>Username:</strong> {currentUser.uname}</li>
          </ul>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default Logout;
