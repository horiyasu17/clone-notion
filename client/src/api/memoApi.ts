import axiosClient from 'src/api/axiosClient';

export type MemoEntity = {
  __v: number;
  _id: string;
  userId: string;
  title: string;
  description: string;
  icon: string;
  position: number;
  favoritePosition: number;
  createdAt: Date;
  updatedAt: Date;
};

const memoApi = {
  create: (): Promise<{ data: MemoEntity }> => axiosClient.post('/memo'),
  getAll: (): Promise<{ data: MemoEntity[] }> => axiosClient.get('/memo'),
  get: (memoId: string): Promise<{ data: MemoEntity }> => axiosClient.get(`/memo/${memoId}`),
  update: (memoId: string, params: MemoEntity): Promise<{ data: MemoEntity }> =>
    axiosClient.put(`/memo/${memoId}`, params),
  delete: (memoId: string): Promise<{ data: MemoEntity }> => axiosClient.delete(`/memo/${memoId}`),
};

export default memoApi;
