import { Request, Response } from 'express';
import { MemoModel } from 'src/v1/models/memoModel';

const FavoriteController = () => {
  // Update favorite flag
  const updateFavorite = async (req: Request, res: Response) => {
    const { memoId } = req.params;
    const { setFavorite } = req.body;

    try {
      const memo = await MemoModel.findOne({ userId: res.locals.user._id, _id: memoId });
      if (!memo) return res.status(404).json({ error: 'メモが存在しません' });

      const allFavorites = await MemoModel.find({
        userId: res.locals.user._id,
        favoritePosition: { $gt: 0 },
      }).sort('-favoritePosition -position');

      // format update data
      const updateData = setFavorite
        ? { favoritePosition: allFavorites[0].favoritePosition + 1 }
        : { favoritePosition: 0 };
      const updatedMemo = await MemoModel.findByIdAndUpdate(memoId, updateData);

      return res.status(201).json(updatedMemo);
    } catch (error) {
      return res.status(500).json(error);
    }
  };

  return { updateFavorite };
};

export default FavoriteController;
