const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const Product = require('../models/Product');

describe('Product API v1', () => {
  beforeAll(async () => {
    // Connect to test database
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce_test');
  });

  afterAll(async () => {
    // Clean up and disconnect
    await Product.deleteMany({});
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    // Clear products before each test
    await Product.deleteMany({});
  });

  describe('GET /api/products', () => {
    it('should return empty array when no products exist', async () => {
      const response = await request(app)
        .get('/api/products')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual([]);
      expect(response.body.count).toBe(0);
    });

    it('should return all products', async () => {
      const product = await Product.create({
        name: 'Test Product',
        description: 'Test Description',
        price: 99.99,
        category: 'Electronics',
        brand: 'Test Brand',
        stock: 10
      });

      const response = await request(app)
        .get('/api/products')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].name).toBe('Test Product');
    });

    it('should filter products by category', async () => {
      await Product.create([
        {
          name: 'Electronics Product',
          description: 'Electronics Description',
          price: 99.99,
          category: 'Electronics',
          brand: 'Test Brand',
          stock: 10
        },
        {
          name: 'Apparel Product',
          description: 'Apparel Description',
          price: 49.99,
          category: 'Apparel',
          brand: 'Test Brand',
          stock: 20
        }
      ]);

      const response = await request(app)
        .get('/api/products?category=Apparel')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].category).toBe('Apparel');
    });
  });

  describe('GET /api/products/:id', () => {
    it('should return product by id', async () => {
      const product = await Product.create({
        name: 'Test Product',
        description: 'Test Description',
        price: 99.99,
        category: 'Electronics',
        brand: 'Test Brand',
        stock: 10
      });

      const response = await request(app)
        .get(`/api/products/${product._id}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe('Test Product');
    });

    it('should return 404 for non-existent product', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      
      const response = await request(app)
        .get(`/api/products/${fakeId}`)
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Product not found');
    });
  });

  describe('POST /api/products', () => {
    it('should create a new product', async () => {
      const productData = {
        name: 'New Product',
        description: 'New Description',
        price: 149.99,
        category: 'Electronics',
        brand: 'New Brand',
        stock: 25
      };

      const response = await request(app)
        .post('/api/products')
        .send(productData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe('New Product');
      expect(response.body.data.price).toBe(149.99);
    });

    it('should validate required fields', async () => {
      const response = await request(app)
        .post('/api/products')
        .send({})
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('required');
    });

    it('should validate price is positive', async () => {
      const productData = {
        name: 'Test Product',
        description: 'Test Description',
        price: -10,
        category: 'Electronics',
        brand: 'Test Brand',
        stock: 10
      };

      const response = await request(app)
        .post('/api/products')
        .send(productData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('positive');
    });
  });
}); 