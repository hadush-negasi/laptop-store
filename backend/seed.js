const mongoose = require('mongoose');
const Product = require('./models/product');
require('dotenv').config(); // Load .env file


const MONGO_URI = process.env.MONGO_URI; // 🔁 Replace with your real URI

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    return Product.insertMany([
      {
        name: "Lenovo ThinkBook 1",
        price: 67500,
        image: "http://localhost:5000/images/laptop-1.jpg",
        description: "14-inch display, Core i7, 16GB RAM, 1TB HDD",
        proCount: 0,
        total: 0
      },
      {
        name: "Lenovo Ideapad",
        price: 98500,
        image: "http://localhost:5000/images/laptop-2.jpeg",
        description: "11th Gen Intel Core, 14-inch, SSD laptop",
        proCount: 0,
        total: 0
      },
      {
        name: "Dell Inspiron 5430",
        price: 67740,
        image: "http://localhost:5000/images/laptop-3.jpg",
        description: "13th Gen, i5, 1TB SSD, FHD+ display",
        proCount: 0,
        total: 0
      },
      {
        name: "Apple MacBook Pro 2022",
        price: 119990,
        image: "http://localhost:5000/images/laptop-4.jpg",
        description: "M2 chip, Retina Display, 256GB SSD",
        proCount: 0,
        total: 0
      },
      {
        name: "HP Envy x360 (Silver)",
        price: 98999,
        image: "http://localhost:5000/images/laptop-5.jpg",
        description: "15.6-inch Touch, i7 11th Gen, 1TB SSD",
        proCount: 0,
        total: 0
      },
      {
        name: "HP Envy x360 (Black)",
        price: 82490,
        image: "http://localhost:5000/images/laptop-6.jpeg",
        description: "13.3-inch WUXGA, i5 12th Gen, 512GB SSD",
        proCount: 0,
        total: 0
      }
    ]);
  })
  .then(() => {
    console.log('✅ All laptops inserted successfully');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('❌ Error seeding data:', err);
    mongoose.disconnect();
  });
