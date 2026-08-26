import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';
import { DashboardIcon, ProductIcon, UsersIcon, CartIcon, LogoutIcon } from '../components/Icons';
import './Admin.css';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="admin-layout">
      <button className="mobile-menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
        ☰
      </button>
      
      <nav className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-logo">
          <h2>Admin Panel</h2>
        </div>
        <ul className="admin-sidebar-menu">
          <li>
            <NavLink to="/" className={({isActive}) => `admin-sidebar-link ${isActive ? 'active' : ''}`} onClick={() => setSidebarOpen(false)}>
              <DashboardIcon />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/products/add" className={({isActive}) => `admin-sidebar-link ${isActive ? 'active' : ''}`} onClick={() => setSidebarOpen(false)}>
              <ProductIcon />
              Add Product
            </NavLink>
          </li>
          <li>
            <NavLink to="/products/manage" className={({isActive}) => `admin-sidebar-link ${isActive ? 'active' : ''}`} onClick={() => setSidebarOpen(false)}>
              <ProductIcon />
              Manage Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/users" className={({isActive}) => `admin-sidebar-link ${isActive ? 'active' : ''}`} onClick={() => setSidebarOpen(false)}>
              <UsersIcon />
              Users
            </NavLink>
          </li>
          <li>
            <NavLink to="/carts" className={({isActive}) => `admin-sidebar-link ${isActive ? 'active' : ''}`} onClick={() => setSidebarOpen(false)}>
              <CartIcon />
              Carts
            </NavLink>
          </li>
          <li>
            <NavLink to="/orders" className={({isActive}) => `admin-sidebar-link ${isActive ? 'active' : ''}`} onClick={() => setSidebarOpen(false)}>
              <CartIcon />
              Orders
            </NavLink>
          </li>
        </ul>
        <div style={{padding: '1rem 1.5rem', borderTop: '1px solid var(--border)'}}>
          <button className="admin-logout-btn btn btn-danger w-full" onClick={handleLogout} style={{width: '100%', justifyContent: 'center'}}>
            <LogoutIcon />
            Logout
          </button>
        </div>
      </nav>
      
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

