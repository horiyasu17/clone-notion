import { useState } from 'react';
import memoApi from 'src/api/memoApi';

export const useHome = () => {
  const [createMemoLoading, setCreateMemoLoading] = useState<boolean>(false);

  // Create Memo handler
  const handlerCreateMemo = async () => {
    try {
      setCreateMemoLoading(true);
      const { data } = await memoApi.create();
    } catch (error) {
      alert(error);
    } finally {
      setCreateMemoLoading(false);
    }
  };

  return { createMemoLoading, handlerCreateMemo };
};
