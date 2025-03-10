import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/SignIn_Up.css';
import RescueLogo from '../assets/images/rescue-logo.png';
import LottiePlayer from '../components/LottiePlayer';
import config from '../config';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // Static admin credentials
  const adminCredentials = {
    email: 'rcadmin@gmail.com',
    password: 'Admin@123'
  };

  const handleNavigateHome = () =>{
    navigate('/');
  }

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      email: '',
      password: '',
    };

    if (!email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      if (email === adminCredentials.email && password === adminCredentials.password) {
        // Admin login
        localStorage.setItem('userRole', 'admin');
        setSuccess('Admin login successful!');
        setError('');
        navigate('/admin');
      } else {
        // Handle normal user login through API
        try {
          const response = await axios.post(`${config.BASE_URL}/api/auth/login`, 
            { email, password },
            { withCredentials: true }
          );

          if (response.status === 200) {
            const { userId, name, email } = response.data;

            // Store user information in localStorage
            localStorage.setItem('userId', userId);
            localStorage.setItem('userRole', 'user');
            localStorage.setItem('userName', name); // Store the user's name
            localStorage.setItem('userEmail', email); // Store the user's email

            setSuccess('Login successful!');
            setError('');
            navigate('/');
            window.location.reload();
          } else {
            setError('Login failed. Please check your credentials and try again.');
            setSuccess('');
          }
        } catch (error) {
          setError(error.response?.data.message || 'An error occurred. Please try again later.');
          setSuccess('');
        }
      }
    }
  };


  return (
    <div className="wrapper d-flex justify-content-center align-items-center min-vh-100">
      <LottiePlayer />
      <div className="w-100 form-container" style={{ maxWidth: '400px' }}>
        <div className="brand" onClick={handleNavigateHome}>
          <img src={RescueLogo} alt="RC" height={50} />
          <span className="custom-heading fs-3">Rescue Channel</span>
        </div>
        <h2 className="heading">Sign In</h2>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              id="email"
              placeholder='Enter your Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              id="password"
              placeholder='Enter your Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>
          <br />
          <button className='btn btn-success text-light' type="submit">Sign In</button>
        </form>
        {error && <div className="text-danger mt-3 text-center">{error}</div>}
        {success && <div className="text-success mt-3 text-center">{success}</div>}
        <p className="new-user">Haven't Registered yet?<a href="/signup" className="register-link">Register now!</a></p>
      </div>
    </div>
  );
};

export default SignIn;
