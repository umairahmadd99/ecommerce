const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories
} = require('../controllers/productController');
const { validateProduct } = require('../middleware/validation');

// Routes
router.route('/')
  .get(getProducts)
  .post(validateProduct, createProduct);

router.route('/categories')
  .get(getCategories);

router.route('/:id')
  .get(getProduct)
  .put(validateProduct, updateProduct)
  .delete(deleteProduct);

module.exports = router; 