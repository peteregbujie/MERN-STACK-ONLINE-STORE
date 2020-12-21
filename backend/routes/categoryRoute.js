import express from 'express';
import { createRequire } from 'module';
import Category from '../models/categoryModel.js';
import { AuthenticateUser, isAdmin } from '../utils.js';
const require = createRequire(import.meta.url);
const { validationResult } = require('express-validator');

const router = express.Router();

router.delete('/:id', AuthenticateUser, isAdmin, async (req, res) => {
 const { id } = req.params;
 try {
  await Category.findOneAndDelete({ _id: id });
  return res.status(200).send('Category has been deleted successfully');
 } catch (error) {
  return res
   .status(400)
   .json({ msg: 'Your request could not be processed. Please try again' });
 }
});

router.post('/add', AuthenticateUser, isAdmin, async (req, res) => {
 try {
  const { name } = req.body;
  const checkCategory = await Category.findOne({ name: name });
  if (checkCategory)
   return res.status(400).json({ msg: 'category already exists' });

  const category = new Category({
   name,
  });

  const savedCategory = await category.save();
  if (!savedCategory) {
   return res.status(400).json({
    error: 'Your request could not be processed. Please try again.',
   });
  }
  res.status(200).json({
   message: `Category has been added successfully!`,
  });
 } catch (error) {
  return res.status(400).json({ msg: error.message });
 }
});

router.get('/:slug', async (req, res) => {
 const { slug } = req.params;
 try {
  const getCategoryProducts = await Category.findOne({
   slug: slug,
  }).populate('products');

  if (!getCategoryProducts) {
   return res.status(404).json({
    message: 'No Products Found.',
   });
  }

  res.status(200).json({
   products: getCategoryProducts.products,
  });
 } catch (error) {
  return res.status(500).send('Server Error');
 }
});

export default router;
