const Joi = require('joi');

const validateProduct = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required().trim().max(100).messages({
      'string.empty': 'Product name is required',
      'string.max': 'Product name cannot exceed 100 characters'
    }),
    description: Joi.string().required().trim().max(500).messages({
      'string.empty': 'Product description is required',
      'string.max': 'Product description cannot exceed 500 characters'
    }),
    price: Joi.number().positive().required().messages({
      'number.base': 'Price must be a number',
      'number.positive': 'Price must be positive',
      'any.required': 'Price is required'
    }),
    category: Joi.string().valid('Electronics', 'Apparel', 'Home & Garden', 'Sports', 'Books', 'Toys', 'Health & Beauty').required().messages({
      'any.only': 'Category must be one of: Electronics, Apparel, Home & Garden, Sports, Books, Toys, Health & Beauty',
      'any.required': 'Category is required'
    }),
    brand: Joi.string().required().trim().max(50).messages({
      'string.empty': 'Brand is required',
      'string.max': 'Brand name cannot exceed 50 characters'
    }),
    stock: Joi.number().integer().min(0).default(0).messages({
      'number.base': 'Stock must be a number',
      'number.integer': 'Stock must be an integer',
      'number.min': 'Stock cannot be negative'
    }),
    images: Joi.array().items(Joi.string().uri()).optional().messages({
      'string.uri': 'Image URLs must be valid URIs'
    }),
    rating: Joi.number().min(0).max(5).default(0).messages({
      'number.min': 'Rating cannot be less than 0',
      'number.max': 'Rating cannot exceed 5'
    }),
    reviews: Joi.number().integer().min(0).default(0).messages({
      'number.integer': 'Review count must be an integer',
      'number.min': 'Review count cannot be negative'
    }),
    isActive: Joi.boolean().default(true)
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      error: error.details[0].message
    });
  }

  next();
};

module.exports = {
  validateProduct
}; 