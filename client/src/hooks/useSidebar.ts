import { useEffect, useState } from 'react';
import memoApi from 'src/api/memoApi';
import { useDispatch } from 'react-redux';
import { setAllMemoData } from 'src/redux/features/memoSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { AppDispatch } from 'src/redux/store';
import { AxiosError } from 'axios';

export const useSidebar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { memoId } = useParams();
  const navigate = useNavigate();
  const [selectedMemoId, setSelectedMemoId] = useState<string | null>(null);

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
    if (memoId) {
      setSelectedMemoId(memoId);
    } else {
      setSelectedMemoId(null);
    }
  }, [navigate]);

  return { selectedMemoId };
};
