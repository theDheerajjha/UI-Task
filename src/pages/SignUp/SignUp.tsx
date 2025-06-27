import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './SignUp.css';

const SignUp: React.FC = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    if (!email || !username || !password) {
      setError('All fields are required.');
      setLoading(false);
      return;
    }
    // Simple email validation
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError('Invalid email address.');
      setLoading(false);
      return;
    }
    const success = await signUp(email, username, password);
    setLoading(false);
    if (success) {
      navigate('/');
    } else {
      setError('Sign up failed.');
    }
  };

  return (
    <div className="signup-container">
      <header className="signup-header">
        <div className="signup-logo">
          <span className="signup-logo-icon"></span>
          foo-rum
        </div>
        <Link to="/" className="signup-back-link">Back to home</Link>
      </header>
      <main className="signup-main">
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="signup-icon">
            <span role="img" aria-label="signup">📝</span>
          </div>
          <h2 className="signup-title">Sign up for an account</h2>
          <div className="signup-subtitle">Create an account to access all the features on this app</div>
          <div className="signup-field">
            <label className="signup-label">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="signup-input"
              required
            />
          </div>
          <div className="signup-field">
            <label className="signup-label">Username</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="signup-input"
              required
            />
          </div>
          <div className="signup-field">
            <label className="signup-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="signup-input"
              required
            />
          </div>
          {error && <div className="signup-error">{error}</div>}
          <button type="submit" disabled={loading} className="signup-button">
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
          <div className="signup-switch">
            Already have an account?{' '}
            <Link to="/signin" className="signup-switch-link">Sign In</Link>
          </div>
        </form>
      </main>
    </div>
  );
};

export default SignUp; 