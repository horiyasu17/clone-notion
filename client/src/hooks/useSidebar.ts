import { useCallback, useEffect, useState } from 'react';
import memoApi from 'src/api/memoApi';
import { useDispatch } from 'react-redux';
import { setAllMemoData } from 'src/redux/features/memoSlice';
import { AppDispatch, RootState, useSelector } from 'src/redux/store';
import { AxiosError } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export const useSidebar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const allMemoData = useSelector((state: RootState) => state.memo.allData);
  const { memoId } = useParams();
  const navigate = useNavigate();
  const [selectedMemoId, setSelectedMemoId] = useState<string | null>(null);

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
  }, [allMemoData, dispatch, navigate]);

  useEffect(() => {
    setSelectedMemoId(memoId ? memoId : null);
  }, [navigate, memoId]);

  return { selectedMemoId, createMemo };
};
