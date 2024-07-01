import express from 'express';
import verifyToken from 'src/v1/handlers/token';
import FavoriteController from 'src/v1/controllers/favorite';

const router = express.Router();
const favoriteCtrl = FavoriteController();

// Update favorite flag
router.put('/:memoId', verifyToken, favoriteCtrl.updateFavorite);

export default router;
