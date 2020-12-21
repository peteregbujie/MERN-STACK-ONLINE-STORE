import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { saveShippingDetails } from '../actions/cartActions';
import { Button, Form, FormInput, Title } from '../globalStyles';

const Shipping = () => {
 let history = useHistory();
 const [shippingName, setShippingName] = useState('');
 const [shippingAddress, setShippingAddress] = useState('');
 const [shippingCity, setShippingCity] = useState('');
 const [shippingState, setShippingState] = useState('');
 const [shippingZipCode, setShippingZipCode] = useState('');

 const dispatch = useDispatch();

 const submitAddressHandler = (e) => {
  e.preventDefault();
  dispatch(
   saveShippingDetails({
    name: shippingName,
    address: shippingAddress,
    city: shippingCity,
    state: shippingState,
    zipCode: shippingZipCode,
   })
  );
  history.push('./CheckoutPage');
 };

 return (
  <>
   <Title>Shipping</Title>
   <Form onSubmit={submitAddressHandler}>
    <FormInput
     type='text'
     name='Name'
     placeholder='Name'
     value={shippingName}
     onChange={(e) => setShippingName(e.target.value)}
    />

    <FormInput
     type='text'
     name='Address'
     placeholder='Address'
     value={shippingAddress}
     onChange={(e) => setShippingAddress(e.target.value)}
    />

    <FormInput
     type='text'
     name='City'
     placeholder='City'
     value={shippingCity}
     onChange={(e) => setShippingCity(e.target.value)}
    />

    <FormInput
     type='text'
     name='State'
     placeholder='State'
     value={shippingState}
     onChange={(e) => setShippingState(e.target.value)}
    />

    <FormInput
     type='text'
     name='ZipCode'
     placeholder='ZipCode'
     value={shippingZipCode}
     onChange={(e) => setShippingZipCode(e.target.value)}
    />

    <Button type='submit'>Submit</Button>
   </Form>
  </>
 );
};

export default Shipping;
