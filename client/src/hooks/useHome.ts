import { useState } from 'react';
import memoApi from 'src/api/memoApi';

export const useHome = () => {
  const [createMemoLoading, setCreateMemoLoading] = useState<boolean>(false);

  // Create Memo handler
  const handlerCreateMemo = async () => {
    try {
      setCreateMemoLoading(true);
      const res = await memoApi.create();
      console.log(res.data);
    } catch (error) {
      alert(error);
    } finally {
      setCreateMemoLoading(false);
    }
  };

  return { createMemoLoading, handlerCreateMemo };
};
