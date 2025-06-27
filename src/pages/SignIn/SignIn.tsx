import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './SignIn.css';

const SignIn: React.FC = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const success = await signIn(emailOrUsername, password);
    setLoading(false);
    if (success) {
      navigate('/');
    } else {
      setError('Invalid credentials.');
    }
  };

  return (
    <div className="signin-container">
      <header className="signin-header">
        <div className="signin-logo">
          <span className="signin-logo-icon"></span>
          foo-rum
        </div>
        <Link to="/" className="signin-back-link">Back to home</Link>
      </header>
      <main className="signin-main">
        <form onSubmit={handleSubmit} className="signin-form">
          <div className="signin-icon">
            <span role="img" aria-label="login">🔑</span>
          </div>
          <h2 className="signin-title">Sign in to continue</h2>
          <div className="signin-subtitle">Sign in to access all the features on this app</div>
          <div className="signin-field">
            <label className="signin-label">Email or username</label>
            <input
              type="text"
              value={emailOrUsername}
              onChange={e => setEmailOrUsername(e.target.value)}
              placeholder="Enter your email or username"
              className="signin-input"
              required
            />
          </div>
          <div className="signin-field">
            <label className="signin-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="signin-input"
              required
            />
          </div>
          {error && <div className="signin-error">{error}</div>}
          <button type="submit" disabled={loading} className="signin-button">
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
          <div className="signin-switch">
            Do not have an account?{' '}
            <Link to="/signup" className="signin-switch-link">Sign Up</Link>
          </div>
        </form>
      </main>
    </div>
  );
};

export default SignIn; 