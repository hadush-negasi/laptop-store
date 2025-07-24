require('dotenv').config();
const mongoose = require('mongoose');
const csv = require('csvtojson');
const Product = require('./models/product'); // adjust path if needed

// this file is used to inset 984 rows of laptop details from a kaggle dataset laptops.csv file
async function importData() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    const rawCSV = await csv().fromFile('./data/laptops.csv');

    // Remove unwanted 'field1' and clean/parse each row
    const products = rawCSV
      .map(laptop => {
        // Remove unnecessary fields
        delete laptop.field1;

        // Clean and parse numeric fields
        const price = laptop.price ? parseFloat(laptop.price.replace(/[^0-9.]/g, '')) : NaN;
        const rating = laptop.rating ? parseFloat(laptop.rating) : 0;
        const no_of_ratings = laptop.no_of_ratings ? parseInt(laptop.no_of_ratings) : 0;
        const no_of_reviews = laptop.no_of_reviews ? parseInt(laptop.no_of_reviews) : 0;

        // Trim string fields safely
        const name = laptop.name?.trim();
        const processor = laptop.processor?.trim();
        const ram = laptop.ram?.trim();
        const os = laptop.os?.trim();
        const storage = laptop.storage?.trim();
        const display = laptop.display?.trim();
        const img_link = laptop.img_link;

        // Skip if critical data missing
        if (!name || isNaN(price) || !processor || !ram || !os || !storage) {
          return null;
        }

        return {
          name,
          price,
          processor,
          ram,
          os,
          storage,
          display,
          rating,
          no_of_ratings,
          no_of_reviews,
          img_link,
          stock: 50,
        };
      })
      .filter(product => product !== null); // Filter out invalid entries

    // Optional: clear existing data
    await Product.deleteMany({});

    // Insert cleaned data
    const result = await Product.insertMany(products);

    console.log(`✅ Inserted ${result.length} valid products`);
    process.exit();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

importData();
