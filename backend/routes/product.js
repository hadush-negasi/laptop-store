const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// add new product
router.post('/', async(req, res)=>{
  try{
    const newProduct = new Product(req.body);
    const saved = await newProduct.save();
    res.status(201).json(saved);

  }catch(err){
    res.status(500).json({error: err.message});
  }
});
// Bulk insert products
router.post('/bulk', async (req, res) => {
  try {
    const inserted = await Product.insertMany(req.body);
    res.status(201).json(inserted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📥 Get all products
router.get('/', async (req, res) => {
  try {
    // Parse query params (default page=1, limit=20)
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const products = await Product.find()
      .skip(skip)
      .limit(limit);

    // Optionally send total count for frontend pagination controls
    const total = await Product.countDocuments();

    res.json({ products, total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/search', async (req, res) => {
  try {
    console.log("inside /search route");
    const { query, ram, os, minPrice, maxPrice, page = 1, limit = 20 } = req.query;
    const filter = {};

    if (query) filter.name = { $regex: query, $options: 'i' };
    if (ram) filter.ram = { $regex: ram, $options: 'i' };
    if (os) filter.os = { $regex: os, $options: 'i' };

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice !== '') filter.price.$gte = Number(minPrice);
      if (maxPrice !== '') filter.price.$lte = Number(maxPrice);
    }

    console.log('FILTER OBJECT:', filter); // 👀 Add this
    
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const products = await Product.find(filter).skip(skip).limit(parseInt(limit));
    const total = await Product.countDocuments(filter);

    res.json({ products, total });
    //console.log(products);
  } catch (err) {
    console.error('Search error:', err); // 👀 See what failed
    res.status(500).json({ error: 'Internal server error' });
  }
});


// 📤 Get a product by ID
router.get('/:id', async (req, res) => {
  try {
    console.log("inside :id route");
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✏️ Update a product by ID
router.put('/:id', async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ❌ Delete a product by ID
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

