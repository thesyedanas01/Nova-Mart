import { useState, useEffect } from 'react';
import {
  HiOutlineUser,
  HiOutlineEnvelope,
  HiOutlineHome,
  HiOutlineLockClosed,
  HiOutlineArrowRightOnRectangle,
  HiXMark,
  HiCheck,
} from 'react-icons/hi2';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const ProfileDropdown = ({ onClose }) => {
  const { user, updateProfile, changePassword, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('personal'); // 'personal' | 'address' | 'security'

  // Personal Info
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);

  // Address Info
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [savingAddress, setSavingAddress] = useState(false);

  // Security Info
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
    } catch {
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
    } catch {
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
    onClose();
  };

  return (
    <div className="profile-dropdown-panel animate-fade-in-up" id="profile-dropdown-panel">
      {/* Panel Header */}
      <div className="profile-panel-header">
        <div className="profile-panel-user">
          <div className="profile-panel-avatar">
            <HiOutlineUser />
          </div>
          <div className="profile-panel-meta">
            <h4 className="profile-panel-name">
              {user?.firstName || user?.lastName
                ? `${user.firstName} ${user.lastName}`.trim()
                : 'My Profile'}
            </h4>
            <span className="profile-panel-email">{user?.email}</span>
          </div>
        </div>
        <button className="profile-panel-close" onClick={onClose} aria-label="Close profile">
          <HiXMark />
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="profile-panel-tabs">
        <button
          className={`profile-tab-btn ${activeTab === 'personal' ? 'profile-tab-btn--active' : ''}`}
          onClick={() => setActiveTab('personal')}
        >
          <HiOutlineUser /> Profile
        </button>
        <button
          className={`profile-tab-btn ${activeTab === 'address' ? 'profile-tab-btn--active' : ''}`}
          onClick={() => setActiveTab('address')}
        >
          <HiOutlineHome /> Address
        </button>
        <button
          className={`profile-tab-btn ${activeTab === 'security' ? 'profile-tab-btn--active' : ''}`}
          onClick={() => setActiveTab('security')}
        >
          <HiOutlineLockClosed /> Password
        </button>
      </div>

      {/* Tab 1: Personal Details */}
      {activeTab === 'personal' && (
        <form onSubmit={handleSaveProfile} className="profile-panel-form">
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
              <label className="form-label" htmlFor="panel-first-name">First Name</label>
              <input
                type="text"
                className="form-input"
                id="panel-first-name"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="panel-last-name">Last Name</label>
              <input
                type="text"
                className="form-input"
                id="panel-last-name"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn--primary btn--sm btn--full"
            disabled={savingProfile}
            id="panel-save-profile-btn"
          >
            <HiCheck /> {savingProfile ? 'Saving...' : 'Save Profile'}
          </button>
        </form>
      )}

      {/* Tab 2: Shipping Address */}
      {activeTab === 'address' && (
        <form onSubmit={handleSaveAddress} className="profile-panel-form">
          <div className="form-group">
            <label className="form-label" htmlFor="panel-address-line1">Address Line 1</label>
            <input
              type="text"
              className="form-input"
              id="panel-address-line1"
              placeholder="House No, Street, Landmark"
              value={addressLine1}
              onChange={(e) => setAddressLine1(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="panel-address-line2">Address Line 2 (Optional)</label>
            <input
              type="text"
              className="form-input"
              id="panel-address-line2"
              placeholder="Apartment, Suite, Unit"
              value={addressLine2}
              onChange={(e) => setAddressLine2(e.target.value)}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="panel-city">City</label>
              <input
                type="text"
                className="form-input"
                id="panel-city"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="panel-state">State</label>
              <input
                type="text"
                className="form-input"
                id="panel-state"
                placeholder="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="panel-zip">Zipcode</label>
            <input
              type="text"
              className="form-input"
              id="panel-zip"
              placeholder="Zipcode"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn btn--primary btn--sm btn--full"
            disabled={savingAddress}
            id="panel-save-address-btn"
          >
            <HiCheck /> {savingAddress ? 'Saving...' : 'Save Address'}
          </button>
        </form>
      )}

      {/* Tab 3: Security & Change Password */}
      {activeTab === 'security' && (
        <form onSubmit={handleChangePassword} className="profile-panel-form">
          <div className="form-group">
            <label className="form-label" htmlFor="panel-old-pwd">Current Password</label>
            <input
              type="password"
              className="form-input"
              id="panel-old-pwd"
              placeholder="Current password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="panel-new-pwd">New Password</label>
            <input
              type="password"
              className="form-input"
              id="panel-new-pwd"
              placeholder="Min 6 characters"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="panel-confirm-pwd">Confirm New Password</label>
            <input
              type="password"
              className="form-input"
              id="panel-confirm-pwd"
              placeholder="Repeat new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className={`btn btn--sm btn--full ${
              newPassword.length >= 6 && newPassword === confirmPassword
                ? 'btn-success-green'
                : 'btn--secondary'
            }`}
            disabled={changingPwd}
            id="panel-change-pwd-btn"
          >
            <HiCheck /> {changingPwd ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      )}

      {/* Standard Red Logout Button at Bottom */}
      <div className="profile-panel-footer">
        <button
          className="btn btn-logout-danger btn--full"
          onClick={handleLogout}
          id="panel-logout-btn"
        >
          <HiOutlineArrowRightOnRectangle /> Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileDropdown;
