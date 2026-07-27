import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  HiOutlineUser,
  HiOutlineEnvelope,
  HiOutlineHome,
  HiOutlineLockClosed,
  HiOutlineArrowRightOnRectangle,
  HiCheck,
} from 'react-icons/hi2';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const { user, updateProfile, changePassword, logout } = useAuth();
  const navigate = useNavigate();

  // Personal info state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);

  // Address state
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [savingAddress, setSavingAddress] = useState(false);

  // Password state
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changingPwd, setChangingPwd] = useState(false);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
      if (user.address) {
        setAddressLine1(user.address.addressLine1 || '');
        setAddressLine2(user.address.addressLine2 || '');
        setCity(user.address.city || '');
        setState(user.address.state || '');
        setZipCode(user.address.zipCode || '');
      }
    }
  }, [user]);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    try {
      await updateProfile({ firstName, lastName });
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setSavingProfile(false);
    }
  };

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    setSavingAddress(true);
    try {
      await updateProfile({
        address: {
          addressLine1,
          addressLine2,
          city,
          state,
          zipCode,
        },
      });
    } catch (error) {
      toast.error('Failed to update address');
    } finally {
      setSavingAddress(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!oldPassword) {
      toast.error('Please enter your current password');
      return;
    }
    if (newPassword.length < 6) {
      toast.error('New password must be at least 6 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    setChangingPwd(true);
    try {
      await changePassword({ oldPassword, newPassword });
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to change password';
      toast.error(msg);
    } finally {
      setChangingPwd(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="container profile-page" id="profile-page">
      {/* Header Banner */}
      <div className="profile-header animate-fade-in-up">
        <div className="profile-header__info">
          <div className="profile-avatar">
            <HiOutlineUser />
          </div>
          <div>
            <h1 className="profile-name">
              {user?.firstName || user?.lastName
                ? `${user.firstName} ${user.lastName}`.trim()
                : 'My Account'}
            </h1>
            <p className="profile-email">{user?.email}</p>
          </div>
        </div>
        <button
          className="btn btn--secondary btn--sm"
          onClick={handleLogout}
          id="profile-logout-btn"
        >
          <HiOutlineArrowRightOnRectangle /> Logout
        </button>
      </div>

      <div className="profile-grid animate-fade-in-up">
        {/* Card 1: Personal Details */}
        <div className="profile-card">
          <div className="profile-card__header">
            <HiOutlineUser className="profile-card__icon" />
            <h3 className="profile-card__title">Personal Details</h3>
          </div>

          <form onSubmit={handleSaveProfile} className="profile-form">
            <div className="form-group">
              <label className="form-label">Email Address (Read-only)</label>
              <div className="form-input-wrapper">
                <HiOutlineEnvelope className="form-input-icon" />
                <input
                  type="email"
                  className="form-input form-input--disabled"
                  value={user?.email || ''}
                  disabled
                  readOnly
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="first-name">First Name</label>
                <input
                  type="text"
                  className="form-input"
                  id="first-name"
                  placeholder="e.g. Aarav"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="last-name">Last Name</label>
                <input
                  type="text"
                  className="form-input"
                  id="last-name"
                  placeholder="e.g. Sharma"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn--primary btn--md"
              disabled={savingProfile}
              id="save-profile-btn"
            >
              <HiCheck /> {savingProfile ? 'Saving...' : 'Save Profile'}
            </button>
          </form>
        </div>

        {/* Card 2: Shipping Address */}
        <div className="profile-card">
          <div className="profile-card__header">
            <HiOutlineHome className="profile-card__icon" />
            <h3 className="profile-card__title">Shipping Address</h3>
          </div>

          <form onSubmit={handleSaveAddress} className="profile-form">
            <div className="form-group">
              <label className="form-label" htmlFor="address-line1">Address Line 1</label>
              <input
                type="text"
                className="form-input"
                id="address-line1"
                placeholder="House No, Street, Landmark"
                value={addressLine1}
                onChange={(e) => setAddressLine1(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="address-line2">Address Line 2 (Optional)</label>
              <input
                type="text"
                className="form-input"
                id="address-line2"
                placeholder="Apartment, Suite, Unit"
                value={addressLine2}
                onChange={(e) => setAddressLine2(e.target.value)}
              />
            </div>

            <div className="form-row form-row--3">
              <div className="form-group">
                <label className="form-label" htmlFor="address-city">City</label>
                <input
                  type="text"
                  className="form-input"
                  id="address-city"
                  placeholder="e.g. Mumbai"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="address-state">State</label>
                <input
                  type="text"
                  className="form-input"
                  id="address-state"
                  placeholder="e.g. Maharashtra"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="address-zip">Zipcode</label>
                <input
                  type="text"
                  className="form-input"
                  id="address-zip"
                  placeholder="e.g. 400001"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn--primary btn--md"
              disabled={savingAddress}
              id="save-address-btn"
            >
              <HiCheck /> {savingAddress ? 'Saving...' : 'Save Address'}
            </button>
          </form>
        </div>

        {/* Card 3: Security & Password */}
        <div className="profile-card profile-card--full">
          <div className="profile-card__header">
            <HiOutlineLockClosed className="profile-card__icon" />
            <h3 className="profile-card__title">Change Password</h3>
          </div>

          <form onSubmit={handleChangePassword} className="profile-form">
            <div className="form-row form-row--3">
              <div className="form-group">
                <label className="form-label" htmlFor="old-password">Current Password</label>
                <input
                  type="password"
                  className="form-input"
                  id="old-password"
                  placeholder="Current password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="new-password">New Password</label>
                <input
                  type="password"
                  className="form-input"
                  id="new-password"
                  placeholder="Min 6 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="confirm-password">Confirm New Password</label>
                <input
                  type="password"
                  className="form-input"
                  id="confirm-password"
                  placeholder="Repeat new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn--secondary btn--md"
              disabled={changingPwd}
              id="change-password-btn"
            >
              <HiCheck /> {changingPwd ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
