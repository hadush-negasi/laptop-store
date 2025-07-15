import React ,{useState } from 'react'
import axios from 'axios';
import { Container,Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import usersData from '../data/usersData'

const  Register= () => {
  const [selectedGender, setSelectedGender ] = useState('')
  const [fname , setFName] = useState('')
  const [lname, setLName ] = useState('')
  const [uname, setUName] = useState('')
  const [password, setPassword] = useState('')
  
  const handleRegister = () => {
    const data = { fname, lname, uname, password, gender: selectedGender };
    axios.post('http://localhost:5000/api/users/register', data)
      .then(res => {
        alert('Registration successful!');
      })
      .catch(err => {
        console.error('❌ Register error:', err);
        alert('Registration failed.');
      });
  };

  return (
    <Container>
        <form >
            <label >First Name:</label><br/>
            <input type="text" value={fname} onChange={(e)=>setFName(e.target.value)}></input><br/>
            <label >First Name:</label><br/>
            <input type="text" value={lname} onChange={(e)=>setLName(e.target.value)}></input><br/>
            <label >User Name: *</label><br/>
            <input type="text" value={uname} onChange={(e)=>setUName(e.target.value)}></input><br/>
            <label >Password: *</label><br/>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}></input><br/>
            <label>Gender: </label><br/>
            <label>
            <input type="radio" value="male" onChange={(e)=>setSelectedGender(e.target.value)} checked={selectedGender == 'male'}/>&nbsp;
            Male
            </label>&nbsp;
            <label>
            <input type="radio" value="female" onChange={(e)=>setSelectedGender(e.target.value)} checked={selectedGender == 'female'} />&nbsp;
            Female
            </label><br/>
            If already registered? <Link to="/login">Login</Link><br/>
            <Button variant="primary" onClick={handleRegister}>Register</Button>
           
        </form>
    </Container>
  )
}

export default Register