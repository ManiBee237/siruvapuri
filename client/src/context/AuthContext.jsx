import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../utils/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      const isAdmin = localStorage.getItem('isAdmin');

      // Skip auth initialization if this is an admin session
      if (isAdmin === 'true') {
        setLoading(false);
        return;
      }

      if (token && storedUser) {
        try {
          const response = await authAPI.getCurrentUser();
          setUser(response.data.user);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Auth init error:', error);
          // Clear invalid tokens
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
          setIsAuthenticated(false);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (credentials) => {
    try {
      // Clear any existing admin session and old user data completely
      localStorage.removeItem('isAdmin');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);

      const response = await authAPI.login(credentials);
      const { token, user: loginUser } = response.data;

      localStorage.setItem('token', token);

      // Fetch complete user data from server to get profile_picture and all fields
      try {
        const userResponse = await authAPI.getCurrentUser();
        const fullUserData = userResponse.data.user;
        localStorage.setItem('user', JSON.stringify(fullUserData));
        setUser(fullUserData);
      } catch {
        // Fallback to login response user data
        localStorage.setItem('user', JSON.stringify(loginUser));
        setUser(loginUser);
      }

      setIsAuthenticated(true);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Login failed'
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData);
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      setUser(user);
      setIsAuthenticated(true);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Registration failed'
      };
    }
  };

  const logout = () => {
    // Clear all user-related data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Don't remove isAdmin - that's managed by admin panel
    setUser(null);
    setIsAuthenticated(false);
    // Force a page reload to clear any cached state
    window.location.href = '/login';
  };

  // Update user data partially (e.g., after profile picture upload)
  const updateUser = (updates) => {
    setUser(prev => {
      const updatedUser = { ...prev, ...updates };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  // Refresh user data from server
  const refreshUser = async () => {
    try {
      const response = await authAPI.getCurrentUser();
      const updatedUser = response.data.user;
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    } catch (error) {
      console.error('Failed to refresh user data:', error);
      return null;
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    updateUser,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
