import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Product = ({ product }) => {
 return (
  <div className='productCard'>
   <Link to={'/product/' + product._id}>
    <img
     src={product.image}
     style={{ width: '100%', height: '300px' }}
     alt='product'
    />
   </Link>
   <p className='productDetails'>{product.name}</p>
   <p>${product.price}</p>
   <p>
    <Link to={'/product/' + product._id}>
     <button>Buy Now</button>
    </Link>
   </p>
  </div>
 );
};

export default Product;
