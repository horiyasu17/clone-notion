import { MemoEntity } from 'src/util/memo.type';

// add favorite
export const addFavorite = (memoData: MemoEntity, allMemoData: MemoEntity[]) => {
  // search favorite
  const allFavorites = allMemoData
    .filter((memo: MemoEntity) => 0 < memo.favoritePosition)
    .sort((a, b) => (a.favoritePosition < b.favoritePosition ? 1 : -1));
  const maxFavoritePosition = allFavorites[0].favoritePosition;

  // update favorite position
  return allMemoData.map((memo: MemoEntity) => {
    return memoData._id === memo._id
      ? { ...memo, favoritePosition: maxFavoritePosition + 1 }
      : memo;
  });
};

// remove favorite
export const removeFavorite = (memoData: MemoEntity, allMemoData: MemoEntity[]) => {
  // update favorite position
  return allMemoData.map((memo: MemoEntity) =>
    memoData._id === memo._id ? { ...memo, favoritePosition: 0 } : memo,
  );
};
