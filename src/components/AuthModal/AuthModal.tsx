import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './AuthModal.css';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
}

const AuthModal: React.FC<AuthModalProps> = ({ open, onClose, initialMode = 'signin' }) => {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (mode === 'signin') {
      if (!email || !password) {
        setError('All fields are required.');
        setLoading(false);
        return;
      }
      const success = await signIn(email, password);
      if (success) {
        onClose();
        setEmail('');
        setPassword('');
        setError('');
      } else {
        setError('Invalid credentials.');
      }
    } else {
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
      if (success) {
        onClose();
        setEmail('');
        setUsername('');
        setPassword('');
        setError('');
      } else {
        setError('Sign up failed.');
      }
    }
    setLoading(false);
  };

  const switchMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
    setError('');
    setEmail('');
    setUsername('');
    setPassword('');
  };

  if (!open) return null;

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal-content" onClick={e => e.stopPropagation()}>
        <button className="auth-modal-back-home" onClick={onClose} type="button">Back to home</button>
        <div className="auth-modal-icon">
          <span role="img" aria-label="auth">
            {mode === 'signin' ? '🔑' : '📝'}
          </span>
        </div>
        <h2 className="auth-modal-title">
          {mode === 'signin' ? 'Sign in to continue' : 'Sign up for an account'}
        </h2>
        <div className="auth-modal-subtitle">
          {mode === 'signin' 
            ? 'Sign in to access all the features on this app'
            : 'Create an account to access all the features on this app'
          }
        </div>
        
        <form onSubmit={handleSubmit} className="auth-modal-form">
          <div className="auth-modal-field">
            <label className="auth-modal-label">
              {mode === 'signin' ? 'Email or username' : 'Email'}
            </label>
            <input
              type={mode === 'signin' ? 'text' : 'email'}
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder={mode === 'signin' ? 'Enter your email or username' : 'Enter your email'}
              className="auth-modal-input"
              required
            />
          </div>
          
          {mode === 'signup' && (
            <div className="auth-modal-field">
              <label className="auth-modal-label">Username</label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="auth-modal-input"
                required
              />
            </div>
          )}
          
          <div className="auth-modal-field">
            <label className="auth-modal-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="auth-modal-input"
              required
            />
          </div>
          
          {error && <div className="auth-modal-error">{error}</div>}
          
          <button 
            type="submit" 
            disabled={loading} 
            className="auth-modal-button"
          >
            {loading 
              ? (mode === 'signin' ? 'Signing In...' : 'Signing Up...') 
              : (mode === 'signin' ? 'Sign In' : 'Sign Up')
            }
          </button>
          
          <div className="auth-modal-switch">
            {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
            <button
              type="button"
              onClick={switchMode}
              className="auth-modal-switch-button"
            >
              {mode === 'signin' ? 'Sign Up' : 'Sign In'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthModal; 