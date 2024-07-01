import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import memoApi from 'src/api/memoApi';
import { setAllMemoData } from 'src/redux/features/memoSlice';
import { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState, useSelector } from 'src/redux/store';
import { MemoEntity } from 'src/util/memo.type';

export const useCommon = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const allMemoData = useSelector((state: RootState) => state.memo.allData);

  const [allMemos, setAllMemos] = useState<MemoEntity[]>([]);
  const [allFavorites, setAllFavorites] = useState<MemoEntity[]>([]);

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

  useEffect(() => {
    setAllMemos(allMemoData.filter((memo: MemoEntity) => 0 === memo.favoritePosition));
    setAllFavorites(
      allMemoData
        .filter((memo: MemoEntity) => 0 < memo.favoritePosition)
        .sort((a, b) => (a.favoritePosition < b.favoritePosition ? 1 : -1)),
    );
  }, [allMemoData]);

  return { allMemos, allFavorites, allMemoData, createMemo, handlerLogout };
};
