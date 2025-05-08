import Review from '../models/Review.js';
import Product from '../models/Product.js';

// @desc    Get all reviews for a product
// @route   GET /api/products/:productId/reviews
// @access  Public
export const getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.product })
      .populate('user', 'name')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a review for a product
// @route   POST /api/products/:productId/reviews
// @access  Private
export const createReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.body.product);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    // Prevent multiple reviews per user
    const existing = await Review.findOne({ product: product._id, user: req.user.id });
    if (existing) return res.status(400).json({ message: 'You have already reviewed this product' });
    const review = new Review({
      user: req.user.id,
      product: product._id,
      rating,
      comment
    });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get reviews by logged in user
// @route   GET /api/user/reviews
// @access  Private
export const getUserReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ user: req.user.id })
      .populate('product', 'name image')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};