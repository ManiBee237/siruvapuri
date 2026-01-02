import { Navigate } from 'react-router-dom';

const AdminProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const isAdmin = localStorage.getItem('isAdmin');

  // Check if user is authenticated and is an admin
  if (!token || isAdmin !== 'true') {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AdminProtectedRoute;
