const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config({ path: './config.env' });

const sampleProducts = [
  {
    name: "iPhone 14 Pro",
    description: "Latest iPhone with advanced camera system and A16 Bionic chip",
    price: 999.99,
    category: "Electronics",
    brand: "Apple",
    stock: 50,
    images: [
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop&crop=face"
    ],
    rating: 4.8,
    reviews: 1250
  },
  {
    name: "Nike Air Max 270",
    description: "Comfortable running shoes with Air Max technology",
    price: 150.00,
    category: "Apparel",
    brand: "Nike",
    stock: 100,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop"
    ],
    rating: 4.5,
    reviews: 890
  },
  {
    name: "Samsung 4K Smart TV",
    description: "55-inch 4K Ultra HD Smart TV with Crystal Display",
    price: 699.99,
    category: "Electronics",
    brand: "Samsung",
    stock: 25,
    images: [
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop&crop=entropy"
    ],
    rating: 4.6,
    reviews: 567
  },
  {
    name: "Adidas T-Shirt",
    description: "Comfortable cotton t-shirt with classic Adidas logo",
    price: 29.99,
    category: "Apparel",
    brand: "Adidas",
    stock: 200,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop"
    ],
    rating: 4.2,
    reviews: 234
  },
  {
    name: "Garden Tool Set",
    description: "Complete set of essential gardening tools",
    price: 89.99,
    category: "Home & Garden",
    brand: "GreenThumb",
    stock: 75,
    images: [
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop&crop=entropy"
    ],
    rating: 4.4,
    reviews: 156
  },
  {
    name: "Basketball",
    description: "Official size and weight basketball for indoor/outdoor use",
    price: 45.00,
    category: "Sports",
    brand: "Spalding",
    stock: 120,
    images: [
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=400&fit=crop"
    ],
    rating: 4.7,
    reviews: 445
  },
  {
    name: "The Great Gatsby",
    description: "Classic novel by F. Scott Fitzgerald",
    price: 12.99,
    category: "Books",
    brand: "Penguin Classics",
    stock: 300,
    images: [
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop"
    ],
    rating: 4.9,
    reviews: 2100
  },
  {
    name: "LEGO Star Wars Set",
    description: "Millennium Falcon building set with 1,329 pieces",
    price: 159.99,
    category: "Toys",
    brand: "LEGO",
    stock: 40,
    images: [
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&h=400&fit=crop&crop=entropy"
    ],
    rating: 4.8,
    reviews: 789
  },
  {
    name: "Face Moisturizer",
    description: "Hydrating face cream with SPF 30 protection",
    price: 24.99,
    category: "Health & Beauty",
    brand: "Neutrogena",
    stock: 150,
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop"
    ],
    rating: 4.3,
    reviews: 678
  },
  {
    name: "Wireless Headphones",
    description: "Noise-cancelling wireless headphones with 30-hour battery life",
    price: 199.99,
    category: "Electronics",
    brand: "Sony",
    stock: 60,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=entropy"
    ],
    rating: 4.6,
    reviews: 923
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert sample products
    const products = await Product.insertMany(sampleProducts);
    console.log(`Inserted ${products.length} products`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase(); 