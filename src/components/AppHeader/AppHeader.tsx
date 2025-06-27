import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './AppHeader.css';

interface AppHeaderProps {
  showBackToHome?: boolean;
  onBackToHome?: () => void;
  onLogin?: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ showBackToHome, onBackToHome, onLogin }) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate('/');
  };

  return (
    <header className="app-header">
      <div className="app-header-inner">
        <div className="app-header-logo">
          <span className="app-header-logo-icon"></span>
          foo-rum
        </div>
        <div>
          {showBackToHome ? (
            <button className="app-header-action" onClick={onBackToHome}>Back to home</button>
          ) : user ? (
            <>
              <span className="app-header-user">Hi, {user.username}</span>
              <button className="app-header-action" onClick={handleLogout}>Log Out</button>
            </>
          ) : (
            <button className="app-header-action" onClick={onLogin}>
              Login
              <span className="feed-login-arrow-icon" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="12" fill="#4f5be8"/>
                  <path d="M10 8l4 4-4 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default AppHeader; 