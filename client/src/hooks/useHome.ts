import { useState } from 'react';
import memoApi from 'src/api/memoApi';
import { AxiosError } from 'axios';

export const useHome = () => {
  const [createMemoLoading, setCreateMemoLoading] = useState<boolean>(false);

  // Create Memo handler
  const handlerCreateMemo = async () => {
    try {
      setCreateMemoLoading(true);
      await memoApi.create();
    } catch (error: unknown) {
      if (error instanceof AxiosError) alert(error.message);
    } finally {
      setCreateMemoLoading(false);
    }
  };

  return { createMemoLoading, handlerCreateMemo };
};
