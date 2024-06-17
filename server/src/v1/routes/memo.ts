import express from 'express';
import verifyToken from 'src/v1/handlers/token';
import MemoController from '../controllers/memo';

const router = express.Router();
const memoCtrl = MemoController();

// Create memo
router.post('/', verifyToken, memoCtrl.create);

// Get all memo data
router.get('/', verifyToken, memoCtrl.getAll);

// Get memo data
router.get('/:memoId', verifyToken, memoCtrl.getOne);

// Update memo data
router.put('/:memoId', verifyToken, memoCtrl.update);

export default router;
