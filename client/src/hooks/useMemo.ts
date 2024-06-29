import { useNavigate, useParams } from 'react-router-dom';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import memoApi from 'src/api/memoApi';
import { AxiosError } from 'axios';
import { debounce } from 'src/util/debounce';
import { setAllMemoData } from 'src/redux/features/memoSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState, useSelector } from 'src/redux/store';
import { addFavorite, removeFavorite } from 'src/util/memoListFactory';
import { MemoEntity } from 'src/util/memo.type';

export type InputFormType = 'title' | 'description';

export const useMemoHook = () => {
  const dispatch = useDispatch<AppDispatch>();
  const allMemoData = useSelector((state: RootState) => state.memo.allData);
  const navigate = useNavigate();
  const { memoId } = useParams();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [memoData, setMemoData] = useState<MemoEntity | null>(null);

  // update memo
  const updateMemo = useCallback(
    (formName: InputFormType, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      let currentUpdateMemo: MemoEntity;
      setMemoData((prevState) => {
        currentUpdateMemo = { ...prevState, [formName]: e.target.value } as MemoEntity;

        // update sidebar memo title
        const allMemo = allMemoData.map((memo: MemoEntity) => {
          return currentUpdateMemo._id === memo._id ? { ...memo, ...currentUpdateMemo } : memo;
        });
        dispatch(setAllMemoData(allMemo));

        return currentUpdateMemo;
      });

      // update memo data
      debounce(async () => {
        try {
          if (memoId) {
            // update memo
            await memoApi.update(memoId, currentUpdateMemo);
          }
        } catch (error: unknown) {
          if (error instanceof AxiosError) alert(error.message);
        }
      });
    },
    [memoId, allMemoData, dispatch],
  );

  // delete memo
  const deleteMemo = useCallback(async () => {
    if (!memoId) return;

    try {
      // delete memo
      await memoApi.delete(memoId);

      // update sidebar memo title
      let deleteItemIndex: number = 0;
      const allMemo = allMemoData.filter((memo: MemoEntity, index: number) => {
        if (memo._id === memoId) {
          deleteItemIndex = index;
          return false;
        } else {
          return true;
        }
      });
      dispatch(setAllMemoData(allMemo));

      // redirect
      if (deleteItemIndex !== 0) {
        navigate(`/memo/${allMemo[deleteItemIndex - 1]._id}`);
      } else if (deleteItemIndex === 0 && 0 < allMemo.length) {
        navigate(`/memo/${allMemo[0]._id}`);
      } else {
        navigate('/');
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) alert(error.message);
    }
  }, [memoId, allMemoData, dispatch, navigate]);

  // update favorite
  const updateFavorite = useCallback(() => {
    if (!memoId || memoData === null) return;

    // update memo data
    debounce(async () => {
      try {
        // update favorite
        await memoApi.updateFavorite(memoId, { setFavorite: !isFavorite });
        // update favorite state
        setIsFavorite(!isFavorite);
        // update all memo data
        const updateAllMemoData = !isFavorite
          ? addFavorite(memoData, allMemoData)
          : removeFavorite(memoData, allMemoData);
        // update store
        dispatch(setAllMemoData(updateAllMemoData));
      } catch (error: unknown) {
        if (error instanceof AxiosError) alert(error.message);
      }
    }, 200);
  }, [memoId, memoData, isFavorite, allMemoData, dispatch]);

  useEffect(() => {
    // Get memo content
    if (memoId)
      (async () => {
        try {
          const { data } = await memoApi.get(memoId);
          setMemoData(data);
          setIsFavorite(0 < data.favoritePosition);
        } catch (error: unknown) {
          if (error instanceof AxiosError) {
            setMemoData(null);
            setIsFavorite(false);
            alert(error.message);
          }
        }
      })();
  }, [memoId]);

  return { isFavorite, memoData, updateMemo, deleteMemo, updateFavorite };
};
