import axiosClient from 'src/api/axiosClient';

export interface MemoEntity extends Document {
  title: string;
  description: string;
  position: number;
  favoritePosition: number;
}

export type CreateMemoType = {};

export type ResponseMemoType = {
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
  create: (): Promise<{ data: ResponseMemoType }> => axiosClient.post('memo'),
};

export default memoApi;
