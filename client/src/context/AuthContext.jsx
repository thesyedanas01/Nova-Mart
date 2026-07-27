import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import API from '../api/axios';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load auth state and fresh profile on mount
  useEffect(() => {
    const initAuth = async () => {
      const savedToken = localStorage.getItem('novamart_token');
      const savedUser = localStorage.getItem('novamart_user');
      if (savedToken) {
        setToken(savedToken);
        if (savedUser) {
          try {
            setUser(JSON.parse(savedUser));
          } catch {
            // parse error fallback
          }
        }
        try {
          const { data } = await API.get('/auth/me');
          setUser(data.user);
          localStorage.setItem('novamart_user', JSON.stringify(data.user));
        } catch {
          // Token expired or invalid
          localStorage.removeItem('novamart_token');
          localStorage.removeItem('novamart_user');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const signup = useCallback(async (email, password) => {
    const { data } = await API.post('/auth/signup', { email, password });
    setToken(data.token);
    setUser(data.user);
    localStorage.setItem('novamart_token', data.token);
    localStorage.setItem('novamart_user', JSON.stringify(data.user));
    toast.success('Account created successfully!');
    return data;
  }, []);

  const login = useCallback(async (email, password) => {
    const { data } = await API.post('/auth/login', { email, password });
    setToken(data.token);
    setUser(data.user);
    localStorage.setItem('novamart_token', data.token);
    localStorage.setItem('novamart_user', JSON.stringify(data.user));
    toast.success('Welcome back!');
    return data;
  }, []);

  const updateProfile = useCallback(async (profileData) => {
    const { data } = await API.put('/auth/profile', profileData);
    setUser(data.user);
    localStorage.setItem('novamart_user', JSON.stringify(data.user));
    toast.success('Profile updated successfully');
    return data.user;
  }, []);

  const changePassword = useCallback(async ({ oldPassword, newPassword }) => {
    const { data } = await API.put('/auth/change-password', { oldPassword, newPassword });
    toast.success('Password updated successfully');
    return data;
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('novamart_token');
    localStorage.removeItem('novamart_user');
    toast.success('Logged out');
  }, []);

  const value = {
    user,
    token,
    isAuthenticated: !!token,
    loading,
    signup,
    login,
    updateProfile,
    changePassword,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
