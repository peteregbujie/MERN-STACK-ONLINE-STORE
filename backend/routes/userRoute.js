import bcrypt from 'bcrypt';
import express from 'express';
import { check, validationResult } from 'express-validator';
import {
 LoginValidator,
 RegisterValidator,
 UpdateUserValidator,
} from '../helper/Validation.js';
import User from '../models/userModel.js';
import { AuthenticateUser, getToken } from '../utils.js';

const router = express.Router();

router.post('/register', RegisterValidator, async (req, res) => {
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
 }

 const { name, email, password, address, city, state, zipCode } = req.body;

 try {
  let user = await User.findOne({ email });
  if (user) return res.status(400).json({ msg: 'Email already exists' });

  const userDetails = new User({
   name,
   email,
   password,
   address,
   city,
   state,
   zipCode,
  });

  const salt = await bcrypt.genSalt(10);
  userDetails.password = await bcrypt.hash(userDetails.password, salt);
  const newUser = await userDetails.save();

  res.status(200).send({
   _id: newUser.id,
   name: newUser.name,
   email: newUser.email,
   isAdmin: newUser.isAdmin,
   token: getToken(newUser),
  });
 } catch (error) {
  res.status(400).json({ message: error.message });
 }
});

router.post('/login', LoginValidator, async (req, res) => {
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
 }

 const { email, password } = req.body;

 try {
  let user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: 'User Does Not Exist' });

  const PasswordMatch = await bcrypt.compare(password, user.password);
  if (!PasswordMatch)
   return res.status(400).json({
    message: 'Incorrect Password !',
   });

  res.status(200).send({
   _id: user.id,
   email: user.email,
   isAdmin: user.isAdmin,
   token: getToken(user),
  });
 } catch (e) {
  res.status(500).json({
   message: error.message,
  });
 }
});

router.put(
 '/:id',
 [AuthenticateUser, UpdateUserValidator],
 async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
   return res.status(400).json({ errors: errors.array() });
  }
  const { name, email, password, address, city, userState, zipCode } = req.body;
  try {
   let user = await User.findById({ email });
   if (!user) {
    return res.status(404).json({ errors: [{ msg: 'User not found!' }] });
   } else {
    user.name = name || user.name;
    user.email = email || user.email;
    user.password = password || user.password;
    user.address = address || user.address;
    user.city = city || user.city;
    user.state = userState || user.state;
    user.zipCode = zipCode || user.zipCode;
   }

   const salt = await bcrypt.genSalt(10);
   user.password = await bcrypt.hash(password, salt);

   const updatedUser = await user.save();
   res.status(200).send({
    name: updatedUser.name,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
    address: updatedUser.address,
    city: updatedUser.city,
    state: updatedUser.state,
    zipCode: updatedUser.zipCode,
    token: getToken(updatedUser),
   });
  } catch (err) {
   console.log(err.message);
   return res.status(500).send('Server Error');
  }
 }
);

router.post(
 // nothing from the outside
 '/createAdmin',
 [
  check('name', 'Name is required')
   .notEmpty()
   .isLength({
    min: 3,
    max: 20,
   })
   .withMessage('Name must be between 3 to 20 characters'),
  check('email', 'Please enter a valid email').isEmail().trim().escape(),
  check('password', 'Please enter a valid password').isLength({
   min: 6,
  }),
  check('isAdmin', '')
   .isBoolean()
   .withMessage('Must be a boolean true or false'),
 ],
 async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
   return res.status(400).json({ errors: errors.array() });
  }
  try {
   const user = new User({
    name: 'Peter Pan ',
    email: 'gblistic@gmail.com',
    password: 'Fashion@2020',
    isAdmin: true,
   });
   const salt = await bcrypt.genSalt(10);
   user.password = await bcrypt.hash(user.password, salt);
   const newAdmin = await user.save();
   res.send(newAdmin);
  } catch (error) {
   res.send({ message: error.message });
  }
 }
);

export default router;
