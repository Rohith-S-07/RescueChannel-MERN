import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import RescueLogo from '../assets/images/rescue-logo.png';
import LottiePlayer from '../components/LottiePlayer';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [licenseDocument, setLicenseDocument] = useState(null); // State for license or document upload
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    };

    if (!name) {
      newErrors.name = 'Name is required';
      valid = false;
    } else if (!/^[A-Za-z\s]+$/.test(name)) {
      newErrors.name = 'Name should only contain letters and spaces';
      valid = false;
    }

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

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const formData = new FormData(); // Use FormData to handle file uploads
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('status', 'onprocess');
      formData.append('role', 'agency');
      if (licenseDocument) {
        formData.append('licenseDocument', licenseDocument); // Append file to the form data
      }

      try {
        await axios.post('http://localhost:5000/api/auth/register', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        });

        alert('Registration Successful');
        navigate('/signin');
      } catch (error) {
        console.error('Registration error:', error);
        alert('An error occurred. Please try again later.');
      }
    }
  };

  const onChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'licenseDocument') {
      setLicenseDocument(files[0]); // Set the file selected by the user
    } else {
      switch (name) {
        case 'name':
          setName(value);
          break;
        case 'email':
          setEmail(value);
          break;
        case 'password':
          setPassword(value);
          break;
        case 'confirmPassword':
          setConfirmPassword(value);
          break;
        default:
          break;
      }
    }
  };

  return (
    <div className="wrapper d-flex justify-content-center align-items-center min-vh-100">
      <LottiePlayer/>
      <div className="w-100 form-container" style={{ maxWidth: '400px' }}>
        <div className="brand">
          <img src={RescueLogo} alt="RC" height={60} className='mb-3' />
          <span className="custom-heading fs-3">Rescue Channel</span>
        </div>
        <h2 className="heading">Register your Agency</h2>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              name="name"
              value={name}
              onChange={onChange}
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              name="email"
              value={email}
              onChange={onChange}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              name="password"
              value={password}
              onChange={onChange}
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
              name="confirmPassword"
              value={confirmPassword}
              onChange={onChange}
            />
            {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="licenseDocument">License or Documents</label>
            <input
              type="file"
              className="form-control"
              name="licenseDocument"
              onChange={onChange}
            />
          </div>
          <button type="submit" className="mt-3 btn btn-warning">Register</button>
        </form>
        <p className="new-user mt-3 text-center">
          Already have an account? <a href="/signin" className="register-link">Sign In</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
