import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false); // New state for loading

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true); // Set loading to true before sending data to API
    const user = {
      name: name,
      email: email,
      password: password,
    };
    try {
      const res = await axios.post('/api/users/register', user);
      const data = res.data;
      setSuccess('Registration successful');
      setLoading(false); // Set loading back to false after successful API call
      // Redirect to root route after a brief delay to show the success message
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    } catch (error) {
      console.log('Error:', error.response.status, error.response.data.message);
      setError('Registration failed');
      setLoading(false); // Set loading back to false after API call fails
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center vh-60">
        <div className="col-md-6">
          <div className="card border-0">
            <div className="card-body p-5">
              <h2 className="card-title text-center mb-4">Registration</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group mt-3">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    className="form-control"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div className="d-grid gap-2 mt-3">
                  {loading ? (
                    <button type="button" className="btn btn-primary" disabled>
                      Loading...
                    </button>
                  ) : (
                    <button type="submit" className="btn btn-primary">
                      Register
                    </button>
                  )}
                </div>
              </form>
              {error && <p className="text-center mt-3 text-danger">{error}</p>}
              {success && <p className="text-center mt-3 text-success">{success}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
