import { useNavigate, useParams } from 'react-router-dom';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import memoApi, { MemoEntity } from 'src/api/memoApi';
import { AxiosError } from 'axios';
import { debounce } from 'src/util/debounce';
import { setAllMemoData } from 'src/redux/features/memoSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState, useSelector } from 'src/redux/store';

export type InputFormType = 'title' | 'description';

export const useMemoHook = () => {
  const dispatch = useDispatch<AppDispatch>();
  const allMemoData = useSelector((state: RootState) => state.memo.allData);
  const navigate = useNavigate();
  const { memoId } = useParams();
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

  useEffect(() => {
    // Get memo content
    if (memoId)
      (async () => {
        try {
          const { data } = await memoApi.get(memoId);
          setMemoData(data);
        } catch (error: unknown) {
          if (error instanceof AxiosError) {
            setMemoData(null);
            alert(error.message);
          }
        }
      })();
  }, [memoId]);

  return { memoData, updateMemo, deleteMemo };
};
