import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

export const useCommon = () => {
  const navigate = useNavigate();

  // Logout
  const handlerLogout = useCallback(() => {
    localStorage.removeItem('token');
    navigate('/login');
  }, []);

  return { handlerLogout };
};
