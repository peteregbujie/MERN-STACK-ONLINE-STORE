import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../actions/productActions';
import '../App.css';
import Product from '../components/Product';
import { Spinner } from '../globalStyles';

const ProductList = () => {
 const productList = useSelector((state) => state.productList);
 const { loading, products, error } = productList;
 const dispatch = useDispatch();

 useEffect(() => {
  dispatch(getProducts());
  return () => {};
 }, [dispatch]);

 return (
  <div>
   <h1 className='Page-title'>Products</h1>
   {loading ? (
    <Spinner alt='loading' />
   ) : error ? (
    <div>{error}</div>
   ) : (
    <ul className='featured-products'>
     {products.map((product) => (
      <li key={product._id}>
       <Product product={product} />
      </li>
     ))}
    </ul>
   )}
  </div>
 );
};

export default ProductList;
