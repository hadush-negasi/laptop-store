import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Card,Container } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import  '../style.css'
import Logout from './Logout'
import { useDispatch, useSelector } from 'react-redux'
import { addAuth } from './Actions'
const Login = () => {
  const [userName, setUserName ] = useState('')
  const [userPass, setUserPass] = useState('')
  const [token , setToken ] = useState('')
  const users = JSON.parse(localStorage.getItem('user'))
  const dispatch = useDispatch()
  // useEffect(()=>{
  //   setToken(JSON.parse(localStorage.getItem('token')))
  // },[token])
  
  const storeToken = useSelector(state=>state.AuthReducer)
   
  console.log("users >>",users)
  console.log("token >>",token)

  const handleLogin = () => {
    axios.post('http://localhost:5000/api/users/login', {
      uname: userName,
      password: userPass
    })
    .then(res => {
      if (res.data.token) {
        localStorage.setItem('token', JSON.stringify(res.data.token));
        dispatch(addAuth({ uname: res.data.user }));
      } else {
        alert('Login failed');
      }
    })
    .catch(err => {
      console.error('❌ Login error:', err);
      alert('Login failed.');
    });
  };

  console.log("store Login",storeToken)
  return (
    <Container >
      { storeToken.length>0 ? <Logout /> : 
          <form  >
            <label>User Name :</label><br/>
            <input type="text" onChange={(e)=>setUserName(e.target.value)} value={userName} /><br/><br/>
            <label>Password :</label><br/>
            <input type="password" placeholder="password"onChange={(e)=>setUserPass(e.target.value)} value={userPass} /><br/><br/>
            <label>If not registered? <Link to="/register">Register</Link></label><br/>
            <Button variant="primary" onClick={handleLogin}>Login</Button>
          </form>
}
    </Container>
  )
}

export default Login