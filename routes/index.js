const express = require('express');
const router = express.Router();

// Import all route modules
const productRoutes = require('./productRoutes');

// Define route prefixes
const routes = [
  {
    path: '/products',
    router: productRoutes
  }
  // Future routes can be added here
];

// Register all routes
routes.forEach(route => {
  router.use(route.path, route.router);
});

module.exports = router; 