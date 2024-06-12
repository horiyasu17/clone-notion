import { useNavigate, useLocation } from 'react-router-dom';
import authApi from 'src/api/AuthApi';
import { useDispatch } from 'react-redux';
import { setUser } from 'src/redux/features/userSlice';
import { AppDispatch } from 'src/redux/store';
import { useEffect } from 'react';

export const useAuthorization = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const pathname = useLocation().pathname;
  const isAuthenticatedView = pathname !== '/login' && pathname !== '/register';

  // Check authorized
  useEffect(() => {
    (async () => {
      const token = localStorage.getItem('token');
      if (!token && isAuthenticatedView) navigate('/login');
      if (!token) return;

      try {
        const { data } = await authApi.verifyToken();
        if (data) dispatch(setUser(data.user));
        if (data && !isAuthenticatedView) navigate('/');
      } catch (error) {
        alert(error);
      }
    })();
  }, [navigate, dispatch, isAuthenticatedView]);
};
