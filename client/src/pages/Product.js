import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addToCart } from '../actions/cartActions';
import { getProductDetails } from '../actions/productActions';
import '../App.css';
import { Button, Spinner } from '../globalStyles';

const Product = () => {
 let { id } = useParams();

 const [quantity, setQuantity] = useState(1);

 const productDetails = useSelector((state) => state.productDetails);
 const { product, loading, error } = productDetails;
 const dispatch = useDispatch();

 useEffect(() => {
  dispatch(getProductDetails(id));
 }, [dispatch, id]);

 const AddToCartHandler = () => {
  dispatch(addToCart(id, quantity));
 };

 return (
  <>
   {loading ? (
    <Spinner alt='loading' />
   ) : error ? (
    <div>{error} </div>
   ) : (
    <>
     <div className='row'>
      <div className='column'>
       <img className='productImg ' src={product.image} alt='' />
      </div>

      <div className='column'>
       <div className='product-info-row'>
        <h1 className='product-name'>{product.slug}</h1>
        <span className='product-info'>{product.brand}</span>
       </div>
       <div className='product-description'>{product.description}</div>
       Qty:{' '}
       <select
        value={quantity}
        onChange={(e) => {
         setQuantity(e.target.value);
        }}
       >
        {[...Array(product.availableQuantity).keys()].map((x) => (
         <option key={x + 1} value={x + 1}>
          {x + 1}
         </option>
        ))}
       </select>
       <div className='product-info-row'>
        <span className='product-price'>${product.price}</span>

        <Button
         style={{ width: '250px' }}
         onClick={AddToCartHandler}
         disabled={product.availableQuantity > 0 ? '' : 'disabled'}
        >
         {product.availableQuantity > 0 ? 'Add To Cart' : 'Sold Out'}
        </Button>
       </div>
      </div>
     </div>
    </>
   )}
   ;
  </>
 );
};

export default Product;
