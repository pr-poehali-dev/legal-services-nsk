import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const AdminPanel = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      navigate('/login');
    } else {
      navigate('/lawyer');
    }
  }, [isAuthenticated, user, navigate]);

  return null;
};

export default AdminPanel;
