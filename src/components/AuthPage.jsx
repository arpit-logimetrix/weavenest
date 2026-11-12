import React, { useState } from 'react';
import { ArrowRightIcon, HeartIcon, LockIcon } from './Icons';

export default function AuthPage({
  pendingWishlistProduct,
  onLogin,
  onRegister,
  onBackToShop,
}) {
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanEmail = email.trim();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.trim().length < 4) {
      setError('Password must be at least 4 characters.');
      return;
    }
    if (mode === 'register' && !name.trim()) {
      setError('Please enter your full name.');
      return;
    }

    setError('');
    if (mode === 'register') {
      onRegister({ name: name.trim(), email: cleanEmail });
    } else {
      onLogin({ email: cleanEmail });
    }
  };

  return (
    <div className="page-view static-page-shell auth-page-shell">
      <div className="container auth-page-container">
        <div className="auth-card">
          <span className="hero-eyebrow">THE WEAVENEST ATELIER</span>
          <h1 className="page-heading-serif auth-heading">
            {mode === 'login' ? 'Sign In to Your Account' : 'Create Your Account'}
          </h1>
          <p className="auth-subtitle">
            {pendingWishlistProduct
              ? 'Sign in to save your curated weaves to your personal wishlist.'
              : 'Access your saved wishlist, addresses, and order history.'}
          </p>

          {pendingWishlistProduct && (
            <div className="auth-wishlist-banner">
              <img
                src={pendingWishlistProduct.image}
                alt={pendingWishlistProduct.title}
                className="auth-wishlist-thumb"
              />
              <div className="auth-wishlist-info">
                <span className="auth-wishlist-kicker">
                  <HeartIcon size={13} filled /> Saving to Wishlist
                </span>
                <strong>{pendingWishlistProduct.title}</strong>
                <span>{pendingWishlistProduct.formattedPrice}</span>
              </div>
            </div>
          )}

          <div className="auth-mode-tabs" role="tablist" aria-label="Authentication mode">
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'login'}
              className={`auth-mode-tab ${mode === 'login' ? 'is-active' : ''}`}
              onClick={() => {
                setMode('login');
                setError('');
              }}
            >
              Sign In
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'register'}
              className={`auth-mode-tab ${mode === 'register' ? 'is-active' : ''}`}
              onClick={() => {
                setMode('register');
                setError('');
              }}
            >
              Create Account
            </button>
          </div>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            {mode === 'register' && (
              <div className="auth-field">
                <label htmlFor="auth-name">Full Name</label>
                <input
                  id="auth-name"
                  type="text"
                  placeholder="Ananya Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}

            <div className="auth-field">
              <label htmlFor="auth-email">Email Address</label>
              <input
                id="auth-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="auth-field">
              <label htmlFor="auth-password">Password</label>
              <input
                id="auth-password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <p className="auth-error-msg" role="alert">
                {error}
              </p>
            )}

            <button type="submit" className="btn-primary-espresso auth-submit-btn">
              <span>{mode === 'login' ? 'Sign In & Continue' : 'Create Account'}</span>
              <ArrowRightIcon size={15} />
            </button>
          </form>

          <div className="auth-footer-meta">
            <span className="auth-security-note">
              <LockIcon size={13} /> Secure atelier account session
            </span>
            <button type="button" className="btn-link-underline" onClick={onBackToShop}>
              Continue Browsing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

