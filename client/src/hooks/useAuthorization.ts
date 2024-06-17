import { useNavigate, useLocation } from 'react-router-dom';
import authApi from 'src/api/AuthApi';
import { useDispatch } from 'react-redux';
import { setUser } from 'src/redux/features/userSlice';
import { AppDispatch } from 'src/redux/store';
import { useEffect } from 'react';
import { useCommon } from 'src/hooks/useCommon';
import { AxiosError } from 'axios';

export const useAuthorization = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { handlerLogout } = useCommon();
  const pathname = useLocation().pathname;
  const isAuthenticatedView = pathname !== '/login' && pathname !== '/register';

  // Check authorized
  useEffect(() => {
    (async () => {
      // Check exist token
      const token = localStorage.getItem('token');
      if (!token && isAuthenticatedView) navigate('/login');
      if (!token) return;

      try {
        // Check authorized token
        const { data } = await authApi.verifyToken();
        if (data) dispatch(setUser(data.user));
        if (data && !isAuthenticatedView) navigate('/');
      } catch (error) {
        if (error instanceof AxiosError) {
          handlerLogout();
          alert(error.response?.data);
        }
      }
    })();
  }, [navigate, dispatch, isAuthenticatedView]);
};
