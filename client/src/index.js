import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import store from './store';

const stripePromise = loadStripe(
 'pk_test_51HdmfUJtlJBlAplcR7Pq4gfMlAiGlMYpwyLzXHKGN5fL0WIzZTcCDq91X3NaOWldzOOCj3nfv31IAls64itR7WwL0034pmHmOg'
);

ReactDOM.render(
 <Provider store={store}>
  <React.StrictMode>
   <Elements stripe={stripePromise}>
    <App />
   </Elements>
  </React.StrictMode>
 </Provider>,
 document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
