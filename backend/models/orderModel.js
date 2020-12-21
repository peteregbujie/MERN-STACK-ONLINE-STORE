import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
 {
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderItems: [
   {
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    image: { type: String, required: true },
    price: { type: String, required: true },
    product: {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'Product',
     required: true,
    },
   },
  ],
  payment: { type: String, required: true },
  shipping: {
   name: { type: String, required: true },
   address: { type: String, required: true },
   city: { type: String, required: true },
   state: { type: String, required: true },
   zipCode: { type: String, required: true },
  },
  productsPrice: { type: Number },
  tax: { type: Number },
  shippingFee: { type: Number },
  total: { type: String },
 },
 {
  timestamps: true,
 }
);

const orderModel = mongoose.model('Order', orderSchema);
export default orderModel;
