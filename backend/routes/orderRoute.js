import express from 'express';
import Stripe from 'stripe';
import Order from '../models/orderModel.js';
import { AuthenticateUser, isAdmin } from '../utils.js';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const router = express.Router();

router.post('/', AuthenticateUser, async (req, res) => {
 try {
  const {
   orderItems,
   payment,
   productsPrice,
   tax,
   shipping,
   shippingFee,
   total,
  } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
   amount: total,
   currency: 'USD',
   description: 'Payment for order',
   payment_method: paymentId,
   confirm: true,
  });
  console.log(paymentIntent);

  const newOrder = new Order({
   user: req.user.id,
   orderItems,
   payment,
   productsPrice,
   tax,
   shipping,
   shippingFee,
   total,
  });
  const NewOrderCreated = await newOrder.save();
  if (NewOrderCreated)
   return res
    .status(201)
    .send({ message: 'New Order Created', data: newOrderCreated });
 } catch (error) {
  return res.status(400).send('Server Error');
 }
});

router.get('/', AuthenticateUser, async (req, res) => {
 const Orders = await Order.find({})
  .populate('user')
  .exec(function (error, Orders) {
   if (error) return res.status(400).json({ msg: 'Server Error' });
   return res.status(200).send(Orders);
  });
});

router.get('/:id', AuthenticateUser, async (req, res) => {
 try {
  const { id } = req.params;
  const order = await Order.findOne({ _id: id });
  if (!order) res.status(404).send('Order Not Found');
  res.status(200).send(order);
 } catch {
  return res.status(400).json({ msg: 'Server Error' });
 }
});

router.delete('/:id', AuthenticateUser, isAdmin, async (req, res) => {
 try {
  const order = await Order.findOne({ _id: req.params.id });
  if (!order) return res.status(404).json({ msg: 'Order Not Found!' });
  res.status.send(order);
 } catch (error) {
  return res.status(500).send('Server Error');
 }
});

export default router;
