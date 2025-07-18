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
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📤 Get a product by ID
router.get('/:id', async (req, res) => {
  try {
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

