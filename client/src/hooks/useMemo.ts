import { useParams } from 'react-router-dom';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import memoApi, { MemoEntity } from 'src/api/memoApi';
import { AxiosError } from 'axios';
import { debounce } from 'src/util/debounce';
import { setAllMemoData } from 'src/redux/features/memoSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/redux/store';

export type InputFormType = 'title' | 'description';

export const useMemo = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { memoId } = useParams();
  const [memoData, setMemoData] = useState<MemoEntity | null>(null);

  // update memo
  const updateMemo = useCallback(
    (formName: InputFormType, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      let currentUpdateMemo: MemoEntity;
      setMemoData((prevState) => {
        currentUpdateMemo = { ...prevState, [formName]: e.target.value } as MemoEntity;
        return currentUpdateMemo;
      });

      // update memo data
      debounce(async () => {
        try {
          if (memoId) {
            await memoApi.update(memoId, currentUpdateMemo);
            if (formName === 'title') {
              const { data } = await memoApi.getAll();
              dispatch(setAllMemoData(data));
            }
          }
        } catch (error: unknown) {
          if (error instanceof AxiosError) {
            alert(error);
          }
        }
      });
    },
    [],
  );

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
            alert(error.response?.data);
          }
        }
      })();
  }, [memoId]);

  return { memoData, updateMemo };
};
