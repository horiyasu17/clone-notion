import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import memoApi from 'src/api/memoApi';
import { setAllMemoData } from 'src/redux/features/memoSlice';
import { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState, useSelector } from 'src/redux/store';

export const useCommon = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const allMemoData = useSelector((state: RootState) => state.memo.allData);

  // create memo
  const createMemo = useCallback(async () => {
    try {
      // create memo
      const { data } = await memoApi.create();
      // update sidebar memo title
      const newAllMemo = [data, ...allMemoData];
      dispatch(setAllMemoData(newAllMemo));
      // redirect
      navigate(`/memo/${data._id}`);
    } catch (error: unknown) {
      if (error instanceof AxiosError) alert(error.message);
    }
  }, [navigate, allMemoData, dispatch]);

  // Logout
  const handlerLogout = useCallback(() => {
    localStorage.removeItem('token');
    navigate('/login');
  }, [navigate]);

  return { createMemo, handlerLogout };
};
