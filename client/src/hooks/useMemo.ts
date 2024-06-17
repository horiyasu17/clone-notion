import { useParams } from 'react-router-dom';
import { ChangeEvent, useEffect, useState } from 'react';
import memoApi, { MemoEntity } from 'src/api/memoApi';
import { AxiosError } from 'axios';

export const useMemo = () => {
  const { memoId } = useParams();
  const [memoData, setMemoData] = useState<MemoEntity | null>(null);

  // update memo
  const updateMemo = (formName: string, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setMemoData((prevState) => {
      return { ...prevState, [formName]: e.target.value } as MemoEntity;
    });
  };

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
  }, []);

  return { memoData, updateMemo };
};
