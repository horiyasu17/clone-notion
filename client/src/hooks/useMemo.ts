import { useParams } from 'react-router-dom';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import memoApi, { MemoEntity } from 'src/api/memoApi';
import { AxiosError } from 'axios';

export const useMemo = () => {
  let timerId: NodeJS.Timeout;
  const DELAY = 1000;
  const { memoId } = useParams();
  const [memoData, setMemoData] = useState<MemoEntity | null>(null);

  const debounce = (func: () => void) => {
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(() => {
      func();
    }, DELAY);
  };

  // update memo
  const updateMemo = useCallback(
    (formName: string, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      let currentUpdateMemo: MemoEntity;
      setMemoData((prevState) => {
        currentUpdateMemo = { ...prevState, [formName]: e.target.value } as MemoEntity;
        return currentUpdateMemo;
      });

      // update memo data
      debounce(async () => {
        try {
          if (memoId) await memoApi.update(memoId, currentUpdateMemo);
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
