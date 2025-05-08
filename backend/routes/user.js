import express from 'express';
const userRouter = express.Router();
import { getUserReviews }  from '../controllers/reviewController.js';
import { protect } from '../middleware/auth.js';

// @route GET /api/user/reviews
userRouter.get('/reviews', protect, getUserReviews);

export default userRouter;