import axiosClient from 'src/api/axiosClient';

export interface RequestMemoType {
  title: string;
  description: string;
  position: number;
  favoritePosition: number;
}

export type CreateMemoType = {};

export type MemoEntity = {
  __v: number;
  _id: string;
  userId: string;
  title: string;
  description: string;
  position: number;
  favoritePosition: number;
  createdAt: Date;
  updatedAt: Date;
};

const memoApi = {
  create: (): Promise<{ data: MemoEntity }> => axiosClient.post('/memo'),
  getAll: (): Promise<{ data: MemoEntity[] }> => axiosClient.get('/memo'),
  get: (memoId: string): Promise<{ data: MemoEntity }> => axiosClient.get(`/memo/${memoId}`),
};

export default memoApi;
