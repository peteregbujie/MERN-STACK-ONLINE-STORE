import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../actions/orderActions';
import '../App.css';
import { Button, Form, Spinner, Title } from '../globalStyles';

const CheckoutPage = (props) => {
 const [succeeded, setSucceeded] = useState(false);
 const [error, setError] = useState(null);
 const [processing, setProcessing] = useState('');
 const [disabled, setDisabled] = useState(true);

 const stripe = useStripe();
 const elements = useElements();
 const cart = useSelector((state) => state.cart);
 const { cartItems, shipping } = cart;

 const orderCreate = useSelector((state) => state.orderCreate);
 const { order, loading, success } = orderCreate;

 const dispatch = useDispatch();

 const PaymentHandler = async (ev) => {
  ev.preventDefault();
  if (!stripe || !elements) {
   return;
  }
  setProcessing(true);

  const { paymentMethod, error } = await stripe.createPaymentMethod({
   type: 'card',
   card: elements.getElement(CardElement),
  });

  if (!error) {
   try {
    dispatch(
     createOrder({
      orderItems: cartItems,
      shipping: shipping,
      payment: paymentMethod.id,
      productsPrice,
      shippingFee,
      tax,
      total,
     })
    );
    setError(null);
    setProcessing(false);
    setSucceeded(true);
   } catch (error) {
    setError(`Payment failed ${error.message}`);
    setProcessing(false);
    setSucceeded(false);
   }
  }
 };

 useEffect(() => {
  if (success) {
   console.log(order);
   props.history.push('/Order');
  }
 }, [order, props.history, success]);

 const handleChange = async (event) => {
  // Listen for changes in the CardElement
  // and display any errors as the customer types their card details
  setDisabled(event.empty);
  setError(event.error ? event.error.message : '');
 };

 const cardStyle = {
  style: {
   base: {
    color: '#32325d',
    fontFamily: 'Arial, sans-serif',
    fontSmoothing: 'antialiased',
    fontSize: '16px',
    '::placeholder': {
     color: '#32325d',
    },
   },
   invalid: {
    color: '#fa755a',
    iconColor: '#fa755a',
   },
  },
 };

 const productsPrice = cartItems.reduce(
  (total, currentItem) => total + currentItem.price * currentItem.quantity,
  0
 );
 const shippingFee = productsPrice > 50 ? 0 : 8;
 const tax = 0.1 * productsPrice;
 const totalToFixed = productsPrice + shippingFee + tax;
 const total = totalToFixed.toFixed(2);

 return loading ? (
  <Spinner alt='loading' />
 ) : error ? (
  <div>{error}</div>
 ) : (
  <div className='row'>
   <ul className='column'>
    <li>
     <Title>Checkout</Title>
    </li>
    <li className='product-info-row'>
     <p>Items</p>
     <span>${productsPrice}</span>
    </li>
    <li className='product-info-row'>
     <p>Shipping</p>
     <span>${shippingFee}</span>
    </li>
    <li className='product-info-row'>
     <p>Tax</p>
     <span>${tax}</span>
    </li>
    <li className='product-info-row'>
     <p>Order Total</p>
     <span>${total}</span>
    </li>
   </ul>

   <div className='column'>
    <Form onSubmit={PaymentHandler}>
     <CardElement
      id='card-element'
      options={cardStyle}
      onChange={handleChange}
     />
     <Button disabled={processing || disabled || succeeded} id='submit'>
      {processing ? <div className='spinner' id='spinner'></div> : 'Pay'}
     </Button>
     {/* Show any error that happens when processing the payment */}
     {error && <div className='card-error'>{error}</div>}
     {/* Show a success message upon completion */}
     <p className={succeeded ? 'result-message' : 'result-message hidden'}></p>
    </Form>
   </div>
  </div>
 );
};

export default CheckoutPage;
