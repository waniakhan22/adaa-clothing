import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';
import { apiRequest } from '../api';
import './Admin.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const data = await apiRequest('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email: username, password }),
      });

      if (data.user?.role !== 'admin') {
        setMessage('Admin access only');
        return;
      }

      auth.login(data.token, data.user);
      navigate('/');
    } catch (error) {
      console.error('Admin login error:', error);
      setMessage('Unable to connect to server');
    } finally {
      setIsLoading(false);
    }
  };

  if (auth.isLoggedIn) {
    navigate('/');
    return <div>Loading...</div>;
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Admin Panel</h1>
        <p style={{color: 'var(--text-muted)', textAlign: 'center', marginBottom: '2rem'}}>Professional Management Dashboard</p>
        
        {message && <div className="message error" style={{marginBottom: '1rem'}}>{message}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              disabled={isLoading}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="1234"
              disabled={isLoading}
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={isLoading} style={{width: '100%'}}>
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

