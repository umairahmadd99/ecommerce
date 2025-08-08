const Product = require('../models/Product');
const logger = require('../utils/logger');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res, next) => {
  try {
    const { category, brand, minPrice, maxPrice, sort = 'createdAt', order = 'desc', page = 1, limit = 10 } = req.query;

    // Build query
    const query = { isActive: true };
    
    if (category) {
      query.category = category;
    }
    
    if (brand) {
      query.brand = { $regex: brand, $options: 'i' };
    }
    
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    // Build sort object
    const sortOptions = {};
    sortOptions[sort] = order === 'desc' ? -1 : 1;

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const products = await Product.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit))
      .select('-__v');

    const total = await Product.countDocuments(query);

    logger.info({
      message: 'Products retrieved successfully',
      count: products.length,
      total,
      filters: { category, brand, minPrice, maxPrice }
    });

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      },
      data: products
    });
  } catch (error) {
    logger.error('Error getting products:', error);
    next(error);
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).select('-__v');

    if (!product) {
      logger.warn({
        message: 'Product not found',
        productId: req.params.id
      });
      
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    logger.info({
      message: 'Product retrieved successfully',
      productId: req.params.id
    });

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    logger.error('Error getting product:', error);
    next(error);
  }
};

// @desc    Create new product
// @route   POST /api/products
// @access  Public
const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);

    logger.info({
      message: 'Product created successfully',
      productId: product._id,
      productName: product.name
    });

    res.status(201).json({
      success: true,
      data: product
    });
  } catch (error) {
    logger.error('Error creating product:', error);
    next(error);
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Public
const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    ).select('-__v');

    if (!product) {
      logger.warn({
        message: 'Product not found for update',
        productId: req.params.id
      });
      
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    logger.info({
      message: 'Product updated successfully',
      productId: req.params.id
    });

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    logger.error('Error updating product:', error);
    next(error);
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Public
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      logger.warn({
        message: 'Product not found for deletion',
        productId: req.params.id
      });
      
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    logger.info({
      message: 'Product deleted successfully',
      productId: req.params.id
    });

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    logger.error('Error deleting product:', error);
    next(error);
  }
};

// @desc    Get product categories
// @route   GET /api/products/categories
// @access  Public
const getCategories = async (req, res, next) => {
  try {
    const categories = await Product.distinct('category');
    
    logger.info({
      message: 'Categories retrieved successfully',
      count: categories.length
    });

    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories
    });
  } catch (error) {
    logger.error('Error getting categories:', error);
    next(error);
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories
}; 