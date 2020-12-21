import mongoose from 'mongoose';
import slugify from 'slugify';

const productSchema = new mongoose.Schema(
 {
  name: { type: String, trim: true, required: true },
  slug: {
   type: String,
   required: true,
   unique: true,
  },
  sku: { type: Number, unique: true, required: true },
  color: {
   type: String,
   required: false,
  },
  image: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true, trim: true, default: 0 },
  description: { type: String, required: true },
  availableQuantity: { type: Number, required: true, default: 0 },
  category: { type: String, required: true },
 },
 { timestamps: true }
);

// We use slugify to create the slug with the name, before saving the product in the database

productSchema.pre('validate', function (next) {
 const product = this;

 if (product.name) {
  product.slug = slugify(product.name, { lower: true, strict: true });
 }
 next();
});

const productModel = mongoose.model('Product', productSchema);

export default productModel;
