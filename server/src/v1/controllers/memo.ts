import { Request, Response } from 'express';
import { MemoDoc, MemoModel } from 'src/v1/models/memoModel';

type RequestMemoBodyType = Pick<MemoDoc, 'title' | 'description'>;

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

  // Update memo data
  const update = async (req: Request, res: Response) => {
    const { memoId } = req.params;
    const { title, description }: RequestMemoBodyType = req.body;
    if (title === '') req.body.title = '無題';
    if (description === '') req.body.description = 'ここに自由に記入してください';

    try {
      const memo = await MemoModel.findOne({ userId: res.locals.user._id, _id: memoId });
      if (!memo) return res.status(404).json({ error: 'メモが存在しません' });

      const updatedMemo = await MemoModel.findByIdAndUpdate(memoId, { $set: req.body });

      return res.status(201).json(updatedMemo);
    } catch (error) {
      return res.status(500).json(error);
    }
  };

  return { create, getAll, getOne, update };
};

export default MemoController;
