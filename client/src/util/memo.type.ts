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

export type FavoriteMemoEntity = { setFavorite: boolean };
