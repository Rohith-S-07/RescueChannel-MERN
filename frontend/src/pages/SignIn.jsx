import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(formData);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/');
      alert('Login Successful');
      window.location.reload();
      
    } catch (error) {
      console.error(error);
      alert('Login Failed');
    }
  };

  return (
    <div>
      <h2>Welcome</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" value={email} onChange={onChange} required />
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" value={password} onChange={onChange} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default SignIn;
