import axiosClient from 'src/api/axiosClient';
import { FavoriteMemoEntity, MemoEntity } from 'src/util/memo.type';

const memoApi = {
  create: (): Promise<{ data: MemoEntity }> => axiosClient.post('/memo'),
  getAll: (): Promise<{ data: MemoEntity[] }> => axiosClient.get('/memo'),
  get: (memoId: string): Promise<{ data: MemoEntity }> => axiosClient.get(`/memo/${memoId}`),
  update: (memoId: string, params: MemoEntity): Promise<{ data: MemoEntity }> =>
    axiosClient.put(`/memo/${memoId}`, params),
  delete: (memoId: string): Promise<{ data: MemoEntity }> => axiosClient.delete(`/memo/${memoId}`),
  updateFavorite: (memoId: string, params: FavoriteMemoEntity): Promise<{ data: MemoEntity }> =>
    axiosClient.put(`/favorite/${memoId}`, params),
};

export default memoApi;
