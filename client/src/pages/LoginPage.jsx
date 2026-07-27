import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HiOutlineEnvelope, HiOutlineLockClosed, HiArrowRight } from 'react-icons/hi2';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || '/products';

  if (isAuthenticated) {
    navigate(from, { replace: true });
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setSubmitting(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (error) {
      const msg = error.response?.data?.message || 'Login failed';
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page" id="login-page">
      <div className="auth-card animate-fade-in-up">
        <div className="auth-card__header">
          <div className="auth-card__brand">
            <span className="navbar__brand-icon"></span> NovaMart
          </div>
          <h1 className="auth-card__title" id="login-title">Welcome Back</h1>
          <p className="auth-card__subtitle">Sign in to access your cart and account</p>
        </div>

        <form className="auth-card__form" onSubmit={handleSubmit} id="login-form">
          <div className="form-group">
            <label className="form-label" htmlFor="login-email">Email Address</label>
            <div className="form-input-wrapper">
              <HiOutlineEnvelope className="form-input-icon" />
              <input
                className="form-input"
                type="email"
                id="login-email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="login-password">Password</label>
            <div className="form-input-wrapper">
              <HiOutlineLockClosed className="form-input-icon" />
              <input
                className="form-input"
                type="password"
                id="login-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn--primary btn--lg btn--full"
            disabled={submitting}
            id="login-submit"
          >
            {submitting ? 'Signing in...' : 'Sign In'} <HiArrowRight />
          </button>
        </form>

        <div className="auth-card__footer">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="auth-card__link">Create account</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
