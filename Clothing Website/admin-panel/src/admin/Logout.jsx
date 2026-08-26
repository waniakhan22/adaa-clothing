import React from 'react';
import { useAuth } from '../contexts/useAuth';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    logout();
    navigate('/login');
  }, [logout, navigate]);

  return <div>Logging out...</div>;
};

export default Logout;

