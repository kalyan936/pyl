'use client';

import { useState } from 'react';

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isRegister) {
        const res = await fetch(`${API_BASE}/api/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, username, password, full_name: fullName }),
        });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.detail || 'Registration failed');
        }
        setIsRegister(false);
        setError('');
        alert('✅ Account created! Please sign in.');
      } else {
        const formData = new URLSearchParams();
        formData.append('username', username);
        formData.append('password', password);

        const res = await fetch(`${API_BASE}/api/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: formData.toString(),
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.detail || 'Login failed');
        }

        const data = await res.json();
        localStorage.setItem('token', data.access_token);
        window.location.href = '/courses/';
      }
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card" id="auth-card">
        <div style={{ textAlign: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '2.5rem' }}>⚡</span>
        </div>
        <h2>{isRegister ? 'Create Account' : 'Welcome Back'}</h2>
        <p className="subtitle">
          {isRegister
            ? 'Start your learning journey today'
            : 'Sign in to continue learning'}
        </p>

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <>
              <div className="form-group">
                <label htmlFor="fullname">Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  id="fullname"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-input"
                  id="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </>
          )}

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-input"
              id="username"
              placeholder="johndoe"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-input"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <div style={{ color: 'var(--error)', fontSize: '0.85rem', marginBottom: '12px', textAlign: 'center' }}>
              {error}
            </div>
          )}

          <button type="submit" className="btn btn-primary" disabled={loading} id="auth-submit">
            {loading ? '⏳ Processing...' : isRegister ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <div className="auth-switch">
          {isRegister ? (
            <>Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); setIsRegister(false); }}>Sign In</a></>
          ) : (
            <>Don&apos;t have an account? <a href="#" onClick={(e) => { e.preventDefault(); setIsRegister(true); }}>Create One</a></>
          )}
        </div>
      </div>
    </div>
  );
}
