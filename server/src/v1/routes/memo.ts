import express from 'express';
import verifyToken from 'src/v1/handlers/token';
import MemoController from '../controllers/memo';

const router = express.Router();
const memoCtrl = MemoController();

// Create memo
router.post('/', verifyToken, memoCtrl.create);

export default router;
