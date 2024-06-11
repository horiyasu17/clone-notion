import express from 'express';
import { default as AuthRouter } from 'src/v1/routes/auth';
import { default as MemoRouter } from 'src/v1/routes/memo';

const authRouter = express.Router();
authRouter.use('/auth', AuthRouter);
authRouter.use('/memo', MemoRouter);

export default authRouter;
