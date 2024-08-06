import React, { useState } from 'react';
import { register } from '../services/authService';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'agency',
  });

  const { name, email, password, role } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      alert('Registration Successful');
    } catch (error) {
      console.error(error);
      alert('Registration Failed');
    }
  };

  return (
    <div>
        <h2>Register your Agency</h2>
        <form onSubmit={onSubmit}>
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" value={name} onChange={onChange} required />
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" value={email} onChange={onChange} required />
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" value={password} onChange={onChange} required />
            <button type="submit">Register</button>
        </form>
        <a href="/signin" className="w-full max-w-md">
            <button className="btn btn-outline-success w-full max-w-md m-2">Sign In</button>
        </a>
    </div>


  );
};

export default SignUp;
