import express from 'express';
import { default as AuthRouter } from 'src/v1/routes/auth';
import { default as MemoRouter } from 'src/v1/routes/memo';
import { default as FavoriteRouter } from 'src/v1/routes/favorite';

const authRouter = express.Router();
authRouter.use('/auth', AuthRouter);
authRouter.use('/memo', MemoRouter);
authRouter.use('/favorite', FavoriteRouter);

export default authRouter;
