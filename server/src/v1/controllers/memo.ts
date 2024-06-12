import { Request, Response } from 'express';
import { MemoModel } from 'src/v1/models/memoModel';

const MemoController = () => {
  // Create memo
  const create = async (_: Request, res: Response) => {
    try {
      const memoCount = await MemoModel.countDocuments({ userId: res.locals.user._id });
      const memo = await MemoModel.create({
        userId: res.locals.user._id,
        position: 0 < memoCount ? memoCount : 0,
      });

      return res.status(201).json(memo);
    } catch (error) {
      return res.status(500).json(error);
    }
  };

  // Get all memo data
  const getAll = async (_: Request, res: Response) => {
    try {
      const allData = await MemoModel.find({ userId: res.locals.user._id }).sort('-position');
      return res.status(201).json(allData);
    } catch (error) {
      return res.status(500).json(error);
    }
  };

  // Get memo data
  const getOne = async (req: Request, res: Response) => {
    const { memoId } = req.params;
    try {
      const memo = await MemoModel.findOne({ userId: res.locals.user._id, _id: memoId });
      if (!memo) return res.status(404).json({ error: 'メモが存在しません' });
      return res.status(201).json(memo);
    } catch (error) {
      return res.status(500).json(error);
    }
  };

  return { create, getAll, getOne };
};

export default MemoController;
