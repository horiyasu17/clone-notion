import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import authApi from 'src/api/AuthApi';
import { useDispatch } from 'react-redux';
import { setUser } from 'src/redux/features/userSlice';

export const useAuthorization = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // redirect root url
    (async () => {
      const token = localStorage.getItem('token');
      if (!token) navigate('/login');

      try {
        const { data } = await authApi.verifyToken();
        if (data) {
          // Save user
          dispatch(setUser(data.user));
          navigate('/');
        }
      } catch {
        return false;
      }
    })();
  }, [navigate]);
};
