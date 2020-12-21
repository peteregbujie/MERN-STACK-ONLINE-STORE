import mongoose from 'mongoose';
import slugify from 'slugify';

const categorySchema = new mongoose.Schema({
 name: {
  type: String,
  required: true,
  trim: true,
  unique: true,
 },
 slug: {
  type: String,
  required: true,
 },
});

//the function pre of the postSchema allows us run a function between the validate and the store article on the database

categorySchema.pre('validate', function (next) {
 const category = this;

 if (category.name) {
  category.slug = slugify(category.name, { lower: true, strict: true }); // We use slugify to create the slug with the name, before saving the category in the database
 }

 next();
});

const categoryModel = mongoose.model('Category', categorySchema);
export default categoryModel;
