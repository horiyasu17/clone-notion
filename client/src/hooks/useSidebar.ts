import { useCallback, useEffect, useState } from 'react';
import memoApi from 'src/api/memoApi';
import { useDispatch } from 'react-redux';
import { setAllMemoData } from 'src/redux/features/memoSlice';
import { AppDispatch } from 'src/redux/store';
import { AxiosError } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export const useSidebar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { memoId } = useParams();
  const navigate = useNavigate();
  const [selectedMemoId, setSelectedMemoId] = useState<string | null>(null);

  // create memo
  const createMemo = useCallback(async () => {
    try {
      // create memo
      await memoApi.create();
      // update sidebar memo title
      const { data } = await memoApi.getAll();
      dispatch(setAllMemoData(data));
    } catch (error: unknown) {
      if (error instanceof AxiosError) alert(error);
    }
  }, [memoId]);

  useEffect(() => {
    // Get all memo data
    (async () => {
      try {
        const { data } = await memoApi.getAll();
        dispatch(setAllMemoData(data));
      } catch (error: unknown) {
        if (error instanceof AxiosError) alert(error.response?.data);
      }
    })();
  }, [dispatch]);

  useEffect(() => {
    setSelectedMemoId(memoId ? memoId : null);
  }, [navigate, memoId]);

  return { selectedMemoId, createMemo };
};
