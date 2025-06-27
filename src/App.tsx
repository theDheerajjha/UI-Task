import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Feed from './pages/Feed/Feed';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import AppHeader from './components/AppHeader/AppHeader';
import AuthModal from './components/AuthModal/AuthModal';

const App: React.FC = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');

  const handleLogin = () => {
    setAuthModalMode('signin');
    setShowAuthModal(true);
  };

  const handleBackToHome = () => {
    setShowAuthModal(false);
  };

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={
            <>
              <AppHeader
                showBackToHome={showAuthModal}
                onBackToHome={handleBackToHome}
                onLogin={handleLogin}
              />
              <Feed
                onShowAuthModal={setShowAuthModal}
                setAuthModalMode={setAuthModalMode}
              />
            </>
          } />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
      <AuthModal
        open={showAuthModal}
        onClose={handleBackToHome}
        initialMode={authModalMode}
      />
    </AuthProvider>
  );
};

export default App;
