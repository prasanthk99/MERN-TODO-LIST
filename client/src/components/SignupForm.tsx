import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../Assets/styles/form.css";

const SignupForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleSignup = async () => {
    // Implement signup logic using authentication service
    try {
        await axios.post('http://localhost:3001/signup', { username, password });
        alert('User registered successfully. Please Login Now !!!');
        navigate("/");
      } catch (error) {
        console.error('Signup failed', error);
        alert('Signup failed. Please try again.');
      }
  };

  return (
    <div className='SignUp-Form userform' style={{
       
    }}>
      <h2>SignUp</h2>
      <form style={{
        display:"flex",
        flexDirection:"column",
        gap:"15px"
      }}>
        <label>
          Username
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required/>
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        </label>
        <button type="button" onClick={handleSignup}>
          Signup
        </button>
        <a href="" onClick={()=>navigate('/')}>Login</a>
      </form>
    </div>
  );
};

export default SignupForm;
