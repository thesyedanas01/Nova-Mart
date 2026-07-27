import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HiOutlineEnvelope, HiOutlineLockClosed, HiArrowRight } from 'react-icons/hi2';
import toast from 'react-hot-toast';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { signup, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate('/products', { replace: true });
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setSubmitting(true);
    try {
      await signup(email, password);
      navigate('/products', { replace: true });
    } catch (error) {
      const msg = error.response?.data?.message || 'Signup failed';
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page" id="signup-page">
      <div className="auth-card animate-fade-in-up">
        <div className="auth-card__header">
          <div className="auth-card__brand">
            <span className="navbar__brand-icon"></span> NovaMart
          </div>
          <h1 className="auth-card__title" id="signup-title">Create Account</h1>
          <p className="auth-card__subtitle">Join NovaMart to shop authentic Indian products</p>
        </div>

        <form className="auth-card__form" onSubmit={handleSubmit} id="signup-form">
          <div className="form-group">
            <label className="form-label" htmlFor="signup-email">Email Address</label>
            <div className="form-input-wrapper">
              <HiOutlineEnvelope className="form-input-icon" />
              <input
                className="form-input"
                type="email"
                id="signup-email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="signup-password">Password</label>
            <div className="form-input-wrapper">
              <HiOutlineLockClosed className="form-input-icon" />
              <input
                className="form-input"
                type="password"
                id="signup-password"
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                autoComplete="new-password"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="signup-confirm">Confirm Password</label>
            <div className="form-input-wrapper">
              <HiOutlineLockClosed className="form-input-icon" />
              <input
                className="form-input"
                type="password"
                id="signup-confirm"
                placeholder="Repeat password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn--primary btn--lg btn--full"
            disabled={submitting}
            id="signup-submit"
          >
            {submitting ? 'Creating account...' : 'Create Account'} <HiArrowRight />
          </button>
        </form>

        <div className="auth-card__footer">
          Already have an account?{' '}
          <Link to="/login" className="auth-card__link">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
