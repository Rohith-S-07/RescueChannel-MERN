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
  const [region, setRegion] = useState('');
  const [district, setDistrict] = useState('');
  const [state, setState] = useState('');
  const [description, setDescription] = useState('');
  const [licenseDocument, setLicenseDocument] = useState(null);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();
  const handleNavigateHome = () =>{
      navigate('/');
  }

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
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('status', 'onprocess');
      formData.append('role', 'agency');
      formData.append('region', region);
      formData.append('district', district);
      formData.append('state', state);
      formData.append('description', description);
      if (licenseDocument) {
        formData.append('licenseDocument', licenseDocument);
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
      setLicenseDocument(files[0]);
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
        case 'region':
          setRegion(value);
          break;
        case 'district':
          setDistrict(value);
          break;
        case 'state':
          setState(value);
          break;
        case 'description':
          setDescription(value);
          break;
        default:
          break;
      }
    }
  };

  return (
    <div className="wrapper d-flex justify-content-center align-items-center min-vh-100 m-3">
      <LottiePlayer />
      <div className="w-100 form-container" style={{ maxWidth: '600px' }}>
        <div className="brand text-center mb-1" onClick={handleNavigateHome}>
          <img src={RescueLogo} alt="RC" height={60} className="mb-2" />
          <span className="custom-heading fs-3">Rescue Channel</span>
        </div>
        <h2 className="heading text-center mb-1">Register your Agency</h2>
        <form onSubmit={onSubmit}>

          {/* Row for Name and Email */}
          <div className="row mb-1">
            <div className="col-md-6">
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
            </div>
            <div className="col-md-6">
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
            </div>
          </div>

          {/* Row for Password and Confirm Password */}
          <div className="row mb-1">
            <div className="col-md-6">
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
            </div>
            <div className="col-md-6">
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
            </div>
          </div>

          {/* Row for Region, District, and State */}
          <div className="row mb-1">
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="region">Region</label>
                <input
                  type="text"
                  className="form-control"
                  name="region"
                  value={region}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="district">District</label>
                <input
                  type="text"
                  className="form-control"
                  name="district"
                  value={district}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="state">State</label>
                <input
                  type="text"
                  className="form-control"
                  name="state"
                  value={state}
                  onChange={onChange}
                />
              </div>
            </div>
          </div>

          {/* Row for Description */}
          <div className="form-group mb-1">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              name="description"
              value={description}
              onChange={onChange}
              rows="4" // Increased height
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="licenseDocument">Upload License Document</label>
            <input
              type="file"
              className="form-control"
              name="licenseDocument"
              onChange={onChange}
            />
          </div>

          <button type="submit" className="btn btn-success">
            Register
          </button>
        </form>

        <p className="new-user">Already Registered?<a href="/signin" className="register-link">Sign In now!</a></p>
      </div>
    </div>
  );
};

export default SignUp;