import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './contexts/useAuth';
import Login from './admin/Login';
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/Dashboard';
import AddProduct from './admin/AddProduct';
import ManageProducts from './admin/ManageProducts';
import Users from './admin/Users';
import Carts from './admin/Carts';
import Orders from './admin/Orders';
import Logout from './admin/Logout';
import './admin/Admin.css';

function AppContent() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/login' && !auth.isLoggedIn) {
      navigate('/login', { replace: true });
    }
  }, [auth.isLoggedIn, location.pathname, navigate]);

  if (auth.isLoggedIn === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products/add" element={<AddProduct />} />
        <Route path="products/manage" element={<ManageProducts />} />
        <Route path="users" element={<Users />} />
        <Route path="carts" element={<Carts />} />
        <Route path="orders" element={<Orders />} />
        <Route path="logout" element={<Logout />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;

