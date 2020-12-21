import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { getProducts } from '../actions/productActions';
import '../App.css';
import Product from '../components/Product';
import { Spinner } from '../globalStyles';
import Bag from '../images/Bags.jpg';
import Shoe from '../images/Shoes.jpg';

const HomePage = () => {
 let { searchQuery } = useParams();
 let { category } = useParams();

 const productList = useSelector((state) => state.productList);
 const { products, loading, error } = productList;
 const dispatch = useDispatch();

 useEffect(() => {
  dispatch(getProducts(category, searchQuery));
  return () => {};
 }, [category, searchQuery, dispatch]);

 return (
  <div className='container'>
   <section className='categories'>
    <Link
     to='/category/Shoes'
     className='category-item'
     style={{
      background: `url(${Shoe})`,
     }}
    >
     <div className='category-item-inner'>
      <div>Shoes</div>
     </div>
    </Link>
    <Link
     to='/category/Bags'
     className='category-item'
     style={{
      background: `url(${Bag})`,
     }}
    >
     <div className='category-item-inner'>
      <div>Bags</div>
     </div>
    </Link>
   </section>
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

export default HomePage;
