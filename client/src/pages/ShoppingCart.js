import React from 'react';
import { BsReverseBackspaceReverse } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import '../App.css';

const ShoppingCart = () => {
 let history = useHistory();
 const cart = useSelector((state) => state.cart);
 const { cartItems, shipping } = cart;

 const dispatch = useDispatch();

 const removeFromCartHandler = (productId) => {
  dispatch(removeFromCart(productId));
 };

 const productsPrice = cartItems.reduce(
  (total, currentItem) => total + currentItem.price * currentItem.quantity,
  0
 );

 const totalQuantity = cartItems.reduce(
  (total, currentItem) => total + currentItem.quantity,
  0
 );

 const goToCheckout = () => {
  if (shipping.address) {
   history.push('./login?redirect=CheckoutPage');
  } else {
   history.push('./login?redirect=Shipping');
  }
 };

 return (
  <div className='cart'>
   <div className='container'>
    <h3>Your cart</h3>
    {cartItems.length > 0 ? (
     <>
      <div className='row'>
       <div className='col-9'>
        <div className='cart__heading'>
         <div className='row'>
          <div className='col-2'>Image</div>
          <div className='col-2'>Name</div>
          <div className='col-2'>Unit Price</div>
          <div className='col-2'>Qty</div>
          <div className='col-2'>Total Price</div>
          <div className='col-2'>Remove</div>
         </div>
        </div>
        {cartItems.map((item) => (
         <div className='row verticalAlign' key={item.product}>
          <div className='col-2'>
           <div className='cart__image'>
            <img src={item.image} alt='' />
           </div>
          </div>
          <div className='col-2'>
           <div className='cart__name'>{item.name}</div>
          </div>
          <div className='col-2'>
           <div className='cart__price'>${item.price}</div>
          </div>
          <div className='col-2'>
           <div className='details__info cart__incDec'>
            <select
             value={item.quantity}
             onChange={(e) => dispatch(addToCart(item.product, e.target.value))}
            >
             {[...Array(item.availableQuantity).keys()].map((x) => (
              <option key={x + 1} value={x + 1}>
               {x + 1}
              </option>
             ))}
            </select>
           </div>
          </div>
          <div className='col-2'>
           <div className='cart__total text-center'>
            ${item.price * item.quantity}
           </div>
          </div>
          <div className='col-2'>
           <div
            className='cart__remove'
            onClick={() => removeFromCartHandler(item.product)}
           >
            <BsReverseBackspaceReverse />
           </div>
          </div>
         </div>
        ))}
       </div>
       <div className='col-3 summary-col'>
        <div className='summary'>
         <div className='summary__heading'>Summary</div>
         <div className='summary__details'>
          <div className='row mb-10'>
           <div className='col-6'>No of Items:</div>
           <div className='col-6'>{totalQuantity}</div>
          </div>
          <div className='row mb-10'>
           <div className='col-6'>Total Price</div>
           <div className='col-6'>${productsPrice}</div>
          </div>
          <button type='button' className='checkout' onClick={goToCheckout}>
           Checkout
          </button>
         </div>
        </div>
       </div>
      </div>
     </>
    ) : (
     'Your cart is empty!'
    )}
   </div>
  </div>
 );
};

export default ShoppingCart;
