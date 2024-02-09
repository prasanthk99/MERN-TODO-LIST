// LoginForm.tsx
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../Assets/styles/form.css";


interface LoginFormProps {
    setToken: any
  }

const LoginForm: React.FC<LoginFormProps> = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Implement login logic using authentication service
    try {
        const response = await axios.post('http://localhost:3001/login', { username, password });
        setToken(response.data.token);
        alert('Login successful');
        navigate("/");
      } catch (error) {
        console.error('Login failed', error);
        alert('Login failed. Please check your credentials.');
      }
  };

  return (
    <div className='Login-Form userform' style={{
        
    }}>
      <h2>Login</h2>
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
        <button type="button" onClick={handleLogin}>
          Login
        </button>
        <a href="" onClick={()=>navigate('/signup')}>SignUp</a>
      </form>
    </div>
  );
};

export default LoginForm;
