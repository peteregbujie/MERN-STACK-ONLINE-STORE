import express from 'express';
import { createRequire } from 'module';
import { ProductValidator } from '../helper/Validation.js';
import Product from '../models/productModel.js';
import { AuthenticateUser, isAdmin } from '../utils.js';
const require = createRequire(import.meta.url);
const { validationResult } = require('express-validator');

const router = express.Router();

// Create Product
router.post('/', AuthenticateUser, isAdmin, async (req, res) => {
 try {
  const {
   name,
   price,
   description,
   brand,
   sku,
   color,
   image,
   category,
   availableQuantity,
  } = req.body;

  if (!name || !description || !price || !category || !availableQuantity) {
   return res.status(400).json({
    error: 'All fields are required',
   });
  }

  const product = new Product({
   name,
   price,
   description,
   image,
   color,
   sku,
   brand,
   category,
   availableQuantity,
  });
  const newProduct = await product.save();
  if (newProduct)
   return res
    .status(201)
    .send({ message: 'New Product Created', data: newProduct });
 } catch (error) {
  return res.status(400).json({ msg: error.message });
 }
}),
 // Update Product
 router.put(
  '/:id',
  [(AuthenticateUser, isAdmin, ProductValidator)],
  async (req, res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
   }
   try {
    const {
     name,
     price,
     description,
     image,
     color,
     availableQuantity,
     brand,
     category,
    } = req.body;
    /*
    let image = [];

    if (req.files) {
     image = req.files.map((file) => {
      return { img: file.filename };
     });
    } else {
     return res.status(400).json({ msg: 'Upload Product Photos' });
    */

    await Product.findOneAndUpdate(
     { _id: req.params.id },
     {
      name,
      price,
      availableQuantity,
      description,
      image,
      color,
      brand,
      category,
     }
    );
    res.status(200).json({ msg: 'Product Updated' });
   } catch (error) {
    return res.status(400).json({ msg: 'Error updating product' });
   }
  }
 );

// Delete Product
router.delete('/:id', AuthenticateUser, isAdmin, async (req, res) => {
 const { id } = req.params;
 try {
  await Product.findOneAndDelete({ _id: id });
  return res.status(200).send('Product Deleted');
 } catch (error) {
  return res.status(400).json({ msg: 'Product Not Deleted' });
 }
});

// Get Single Product

router.get('/:id', async (req, res) => {
 try {
  const product = await Product.findOne({ _id: req.params.id });
  if (!product) return res.status(404).json({ msg: 'Product Not Found!' });
  res.status(200).send(product);
 } catch (error) {
  return res.status(500).send('Server Error');
 }
});

//Get All Products
router.get('/', async (req, res) => {
 try {
  const category = req.query.category ? { category: req.query.category } : {};
  const searchQuery = req.query.searchQuery
   ? {
      slug: {
       $regex: req.query.searchQuery,
       $options: 'i',
      },
     }
   : {};
  const products = await Product.find({ ...category, ...searchQuery });
  res.status(200).send(products);
 } catch (error) {
  return res.status(500).send('Server Error');
 }
});

export default router;
