import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import authApi from 'src/api/AuthApi';
import { useDispatch } from 'react-redux';
import { setUser } from 'src/redux/features/userSlice';
import { AppDispatch } from 'src/redux/store';

export const useAuthorization = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const pathname = useLocation().pathname;
  const isAuthenticatedView = pathname !== '/login' && pathname !== '/register';

  useEffect(() => {
    // redirect root url
    (async () => {
      const token = localStorage.getItem('token');
      if (!token && isAuthenticatedView) navigate('/login');

      try {
        const { data } = await authApi.verifyToken();

        if (data) {
          // Save user data
          dispatch(setUser(data.user));
          navigate('/');
        }
      } catch {
        return false;
      }
    })();
  }, [navigate, dispatch]);
};
