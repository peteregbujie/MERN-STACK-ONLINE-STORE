import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { check } = require('express-validator');

export const RegisterValidator = [
 check('FirstName', 'First Name is required')
  .notEmpty()
  .isLength({
   min: 4,
   max: 20,
  })
  .withMessage('First Name must be between 3 to 20 characters'),
 check('LastName', 'Last Name is required')
  .notEmpty()
  .isLength({
   min: 4,
   max: 20,
  })
  .withMessage('Last Name must be between 3 to 20 characters'),
 check('email')
  .isEmail()
  .normalizeEmail()
  .trim()
  .escape()
  .withMessage('Must be a valid email address'),
 check('password', 'password is required')
  .notEmpty()
  .isLength({
   min: 6,
   max: 32,
  })
  .trim()
  .escape()
  .withMessage('Password must be between 6 to 32 characters')
  .matches(/\d/)
  .withMessage('password must contain a number'),
];

export const LoginValidator = [
 check('email')
  .isEmail()
  .normalizeEmail()
  .trim()
  .escape()
  .withMessage('Must be a valid email address'),
 check('password', 'password is required')
  .notEmpty()
  .isLength({
   min: 6,
  })
  .trim()
  .escape()
  .withMessage('Password must contain at least 6 characters')
  .matches(/\d/)
  .withMessage('password must contain a number'),
];

export const UpdateUserValidator = [
 check('FirstName', 'First Name is required')
  .isLength({
   min: 4,
   max: 20,
  })
  .withMessage('First Name must be between 3 to 20 characters'),
 check('LastName', 'Last Name is required')
  .isLength({
   min: 4,
   max: 20,
  })
  .withMessage('Last Name must be between 3 to 20 characters'),
 check('email')
  .isEmail()
  .normalizeEmail()
  .trim()
  .escape()
  .withMessage('Must be a valid email address'),
 check('password', 'password is required')
  .isLength({
   min: 6,
   max: 32,
  })
  .trim()
  .escape()
  .withMessage('Password must be between 6 to 32 characters')
  .matches(/\d/)
  .withMessage('password must contain a number'),
];

export const ProductValidator = [
 check('name', 'Product Name is required')
  .isString()
  .isLength({
   min: 4,
   max: 100,
  })
  .trim()
  .escape()
  .withMessage('Product Name must be between 4 to 100 characters'),
 check('sku', 'Add the SKU').isAlphanumeric(),
 check('Price', 'Add the price').isDecimal(),
 check('availableQuantity', 'Available Quantity must be a number').isNumeric(),
 check('brand', 'Brand Name is required').notEmpty().optional().trim().escape(),
 check('description', 'Description is required')
  .isAlphanumeric()
  .notEmpty()
  .isLength({
   min: 15,
   max: 200,
  })
  .trim()
  .escape()
  .withMessage('Description must be between 15 to 200 characters'),
];

export const CategoryValidator = [
 check('name', 'Name is required')
  .isString()
  .isLength({
   min: 4,
   max: 20,
  })
  .trim()
  .escape()
  .withMessage('Category must be between 3 to 20 characters'),

 check('description', 'Description is required')
  .isAlphanumeric()
  .isLength({
   min: 15,
   max: 200,
  })
  .trim()
  .escape()
  .withMessage('Description must be between 15 to 200 characters'),
];
