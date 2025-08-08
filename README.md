# E-commerce Product API

A RESTful API for managing products in an e-commerce platform built with Node.js, Express, and MongoDB.

## 🚀 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Validation**: Joi for request validation
- **Logging**: Winston for structured logging
- **Security**: Helmet, CORS, Rate limiting
- **Environment**: dotenv for configuration management

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

## 🛠️ Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/umairahmadd99/ecommerce
   cd ecommerce
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   ```bash
   # Copy the config file
   cp config.env.example config.env

   # Edit config.env with your MongoDB connection string
   MONGODB_URI=mongodb://localhost:27017/ecommerce
   ```

4. **Start MongoDB** (if using local installation)

   ```bash
   # macOS with Homebrew
   brew services start mongodb-community

   # Or start manually
   mongod
   ```

5. **Seed the database with sample data**

   ```bash
   npm run seed
   ```

6. **Start the server**

   ```bash
   # Development mode with auto-reload
   npm run dev

   # Production mode
   npm start
   ```

The API will be available at `http://localhost:3000`

## 📚 API Documentation

### API Versioning

The API uses versioning in the URL structure. The current version is `v1` and can be configured via the `API_VERSION` environment variable.

### Base URL

```
http://localhost:3000/api/v1
```

### Endpoints

#### 1. Get All Products

```http
GET /products
```

**Query Parameters:**

- `category` (string): Filter by category
- `brand` (string): Filter by brand (case-insensitive)
- `minPrice` (number): Minimum price filter
- `maxPrice` (number): Maximum price filter
- `sort` (string): Sort field (default: createdAt)
- `order` (string): Sort order - 'asc' or 'desc' (default: desc)
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10)

**Example Requests:**

```bash
# Get all products
curl -X GET http://localhost:3000/api/v1/products

# Filter by category
curl -X GET "http://localhost:3000/api/v1/products?category=Apparel"

# Filter by price range
curl -X GET "http://localhost:3000/api/v1/products?minPrice=50&maxPrice=200"

# Sort by price ascending
curl -X GET "http://localhost:3000/api/v1/products?sort=price&order=asc"

# Pagination
curl -X GET "http://localhost:3000/api/v1/products?page=2&limit=5"
```

**Response:**

```json
{
  "success": true,
  "count": 10,
  "total": 25,
  "pagination": {
    "page": 1,
    "limit": 10,
    "pages": 3
  },
  "data": [
    {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "name": "iPhone 14 Pro",
      "description": "Latest iPhone with advanced camera system",
      "price": 999.99,
      "category": "Electronics",
      "brand": "Apple",
      "stock": 50,
      "images": [
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop"
      ],
      "rating": 4.8,
      "reviews": 1250,
      "isActive": true,
      "createdAt": "2023-09-06T10:30:00.000Z",
      "updatedAt": "2023-09-06T10:30:00.000Z"
    }
  ]
}
```

#### 2. Get Single Product

```http
GET /products/:id
```

**Example Request:**

```bash
curl -X GET http://localhost:3000/api/v1/products/64f8a1b2c3d4e5f6a7b8c9d0
```

**Response:**

```json
{
  "success": true,
  "data": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "name": "iPhone 14 Pro",
    "description": "Latest iPhone with advanced camera system",
    "price": 999.99,
    "category": "Electronics",
    "brand": "Apple",
    "stock": 50,
    "images": [
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop"
    ],
    "rating": 4.8,
    "reviews": 1250,
    "isActive": true,
    "createdAt": "2023-09-06T10:30:00.000Z",
    "updatedAt": "2023-09-06T10:30:00.000Z"
  }
}
```

#### 3. Create New Product

```http
POST /products
```

**Request Body:**

```json
{
  "name": "New Product",
  "description": "Product description",
  "price": 99.99,
  "category": "Electronics",
  "brand": "Brand Name",
  "stock": 100,
  "images": [
    "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop"
  ],
  "rating": 4.5,
  "reviews": 0
}
```

**Example Request:**

```bash
curl -X POST http://localhost:3000/api/v1/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Product",
    "description": "Product description",
    "price": 99.99,
    "category": "Electronics",
    "brand": "Brand Name",
    "stock": 100
  }'
```

**Response:**

```json
{
  "success": true,
  "data": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d1",
    "name": "New Product",
    "description": "Product description",
    "price": 99.99,
    "category": "Electronics",
    "brand": "Brand Name",
    "stock": 100,
    "rating": 0,
    "reviews": 0,
    "isActive": true,
    "createdAt": "2023-09-06T10:30:00.000Z",
    "updatedAt": "2023-09-06T10:30:00.000Z"
  }
}
```

#### 4. Update Product

```http
PUT /products/:id
```

**Example Request:**

```bash
curl -X PUT http://localhost:3000/api/v1/products/64f8a1b2c3d4e5f6a7b8c9d0 \
  -H "Content-Type: application/json" \
  -d '{
    "price": 899.99,
    "stock": 45
  }'
```

#### 5. Delete Product

```http
DELETE /products/:id
```

**Example Request:**

```bash
curl -X DELETE http://localhost:3000/api/v1/products/64f8a1b2c3d4e5f6a7b8c9d0
```

#### 6. Get Categories

```http
GET /products/categories
```

**Example Request:**

```bash
curl -X GET http://localhost:3000/api/v1/products/categories
```

**Response:**

```json
{
  "success": true,
  "count": 7,
  "data": [
    "Electronics",
    "Apparel",
    "Home & Garden",
    "Sports",
    "Books",
    "Toys",
    "Health & Beauty"
  ]
}
```

### Health Check

```http
GET /health
```

**Example Request:**

```bash
curl -X GET http://localhost:3000/health
```

## 🔧 Data Validation

The API includes comprehensive data validation:

- **Required Fields**: name, description, price, category, brand
- **Price**: Must be positive number
- **Category**: Must be one of predefined categories
- **Stock**: Must be non-negative integer
- **Rating**: Must be between 0 and 5
- **Images**: Must be valid URLs
- **String Lengths**: Enforced limits on name, description, and brand

## 🛡️ Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Input Validation**: Joi schema validation
- **Error Handling**: Comprehensive error responses

## 📊 Logging

The application uses Winston for structured logging:

- **Log Levels**: error, warn, info, debug
- **File Logs**: `logs/error.log` and `logs/combined.log`
- **Console Logs**: In development mode
- **Request Logging**: HTTP requests via Morgan

## 🗄️ Database Schema

### Product Model

```javascript
{
  name: String (required, max 100 chars),
  description: String (required, max 500 chars),
  price: Number (required, min 0),
  category: String (required, enum),
  brand: String (required, max 50 chars),
  stock: Number (required, min 0),
  images: [String] (URLs),
  rating: Number (0-5),
  reviews: Number (min 0),
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

## 🚀 Available Categories

- Electronics
- Apparel
- Home & Garden
- Sports
- Books
- Toys
- Health & Beauty

## 📝 Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "error": "Error message description"
}
```

Common HTTP Status Codes:

- `200`: Success
- `201`: Created
- `400`: Bad Request (validation error)
- `404`: Not Found
- `500`: Internal Server Error

## 🧪 Testing

Run the test suite:

```bash
npm test
```

## 📁 Project Structure

```
ecommerce/
├── controllers/
│   └── productController.js
├── middleware/
│   ├── errorHandler.js
│   └── validation.js
├── models/
│   └── Product.js
├── routes/
│   └── productRoutes.js
├── scripts/
│   └── seedData.js
├── utils/
│   └── logger.js
├── logs/
├── config.env
├── package.json
├── README.md
└── server.js
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
