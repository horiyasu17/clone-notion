import { useNavigate } from 'react-router-dom';

export const useCommon = () => {
  const navigate = useNavigate();

  // Logout
  const handlerLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return { handlerLogout };
};
