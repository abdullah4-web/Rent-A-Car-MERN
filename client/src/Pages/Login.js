import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { RentContext } from './RentContext';
import { Spinner } from 'react-bootstrap';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false); // New state for loading

  const { login } = useContext(RentContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Set loading to true before sending data to API
    const user = {
      email: email,
      password: password,
    };
    try {
      const res = await axios.post('/api/users/login', user);
      const data = res.data;
      // Process the login success response if needed
      login(data); // Store user data in context
      localStorage.setItem('user', JSON.stringify(data)); // Store user data in local storage
      setSuccess('Login successful');
      window.location.href = '/'; // Redirect to root route
    } catch (error) {
      console.log('Error:', error.response.status, error.response.data.message);
      setError('Login failed');
    }
    setLoading(false); // Set loading back to false after API call is completed
  };

  return (
    <div className="container-fluid bg-light d-flex align-items-center justify-content-center ">
      <div className="col-md-4">
       \
          <div className="card-body p-5">
            <h2 className="card-title text-center mb-4">Login</h2>
            {loading ? (
              <Spinner />
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary">
                    Log In
                  </button>
                </div>
              </form>
            )}
            {error && <p className="text-center mt-3 text-danger">{error}</p>}
            {success && <p className="text-center mt-3 text-success">{success}</p>}
          </div>
        
      </div>
    </div>
  );
};

export default Login;
