import express from 'express';
const productRouter = express.Router();
import multer from 'multer';
import  path from 'path';
import { protect, authorize } from '../middleware/auth.js';
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js';
import { getProductReviews, createReview } from '../controllers/reviewController.js';

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${ext}`);
  }
});
const upload = multer({ storage });

// Public routes
productRouter.get('/', getProducts);
productRouter.get('/:id', getProduct);

// Review routes
productRouter.get('/reviews/:product', getProductReviews);
productRouter.post('/reviews', protect, createReview);

// Admin routes
productRouter.post('/', protect, authorize('admin'), upload.single('image'), createProduct);
productRouter.put('/:id', protect, authorize('admin'), upload.single('image'), updateProduct);
productRouter.delete('/:id', protect, authorize('admin'), deleteProduct);

export default productRouter;