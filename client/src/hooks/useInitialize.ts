import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/redux/store';
import memoApi from 'src/api/memoApi';
import { AxiosError } from 'axios';
import { setAllMemoData } from 'src/redux/features/memoSlice';
import { useCommon } from 'src/hooks/useCommon';
import authApi from 'src/api/AuthApi';
import { setUser } from 'src/redux/features/userSlice';

export const useInitialize = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const isAuthenticatedView = pathname !== '/login' && pathname !== '/register';
  const { handlerLogout } = useCommon();

  // Check authorized
  useEffect(() => {
    (async () => {
      // Check exist token
      const token = localStorage.getItem('token');
      if (!token && isAuthenticatedView) navigate('/login');
      if (!token) return;

      // Check authorized token
      try {
        const { data } = await authApi.verifyToken();
        if (data) dispatch(setUser(data.user));
        if (data && !isAuthenticatedView) navigate('/');
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          handlerLogout();
          alert(error.message);
        }
      }

      // Get initial memo data
      try {
        const { data } = await memoApi.getAll();
        dispatch(setAllMemoData(data));
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          alert(error.message);
        }
      }
    })();
  }, [navigate, dispatch, isAuthenticatedView, handlerLogout]);

};
