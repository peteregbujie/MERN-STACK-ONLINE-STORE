import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { payOrder } from '../actions/orderActions';
import { Button, Form } from '../globalStyles';
import '../Styles/CardSectionStyles.css';

export function StripeForm({ order }) {
 const [succeeded, setSucceeded] = useState(false);
 const [error, setError] = useState(null);
 const [processing, setProcessing] = useState('');
 const [disabled, setDisabled] = useState(true);

 const stripe = useStripe();
 const elements = useElements();

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
   const paymentId = paymentMethod.id;
   try {
    dispatch(payOrder(order, paymentId));
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

 return (
  <Form onSubmit={PaymentHandler}>
   <CardElement id='card-element' options={cardStyle} onChange={handleChange} />
   <Button disabled={processing || disabled || succeeded} id='submit'>
    {processing ? <div className='spinner' id='spinner'></div> : 'Pay'}
   </Button>
   {/* Show any error that happens when processing the payment */}
   {error && <div className='card-error'>{error}</div>}
   {/* Show a success message upon completion */}
   <p className={succeeded ? 'result-message' : 'result-message hidden'}></p>
  </Form>
 );
}
