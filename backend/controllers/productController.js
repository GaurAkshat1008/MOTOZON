import Product from '../models/Product.js';
import cloudinary from '../config/cloudinary.js';
import fs from 'fs';

// Helper function to upload image to Cloudinary
const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.path);
    // Remove the file from local storage after upload
    fs.unlinkSync(file.path);
    return result.secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Error uploading to Cloudinary');
  }
};

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Admin
export const createProduct = async (req, res) => {
  try {
    const { name, price, description, category, stock } = req.body;
    let imageUrl = '';

    if (req.file) {
      imageUrl = await uploadToCloudinary(req.file);
    }

    const product = new Product({
      name, price, description, category, stock, image: imageUrl
    });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Admin
export const updateProduct = async (req, res) => {
  try {
    const updates = { ...req.body };

    if (req.file) {
      updates.image = await uploadToCloudinary(req.file);
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Admin
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product removed' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};