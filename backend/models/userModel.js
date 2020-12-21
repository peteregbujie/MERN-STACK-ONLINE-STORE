import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
 name: {
  type: String,
  required: true,
  trim: true,
  min: 3,
  max: 20,
 },

 email: {
  type: String,
  required: true,
  unique: true,
  trim: true,
 },

 password: {
  type: String,
  required: true,
 },

 address: { type: String, required: false },
 city: { type: String, required: false },
 zipCode: { type: String, required: false },
 state: { type: String, required: false },

 isAdmin: { type: Boolean, required: true, default: false },
});

const userModel = mongoose.model('User', userSchema);

export default userModel;
