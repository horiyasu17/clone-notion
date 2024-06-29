import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/redux/store';
import memoApi from 'src/api/memoApi';
import { AxiosError } from 'axios';
import { setAllMemoData } from 'src/redux/features/memoSlice';

export const useInitialize = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Get initial memo data
    (async () => {
      try {
        const { data } = await memoApi.getAll();
        dispatch(setAllMemoData(data));
      } catch (error: unknown) {
        if (error instanceof AxiosError) alert(error.message);
      }
    })();
  }, [dispatch]);
};
