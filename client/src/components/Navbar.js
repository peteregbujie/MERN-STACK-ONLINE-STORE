import React from 'react';
import { FiShoppingBag } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { logout } from '../actions/userActions';
import '../App.css';

function Navbar({ searchQuery, setSearchQuery }) {
 const history = useHistory();
 const searchProductHandler = (e) => {
  e.preventDefault();
  history.push(`/search/${searchQuery}`);
 };

 const userLogin = useSelector((state) => state.userLogin);
 const { userInfo } = userLogin;

 const cart = useSelector((state) => state.cart);
 const { cartItems } = cart;

 const dispatch = useDispatch();

 const logoutHandler = () => {
  dispatch(logout());
 };
 return (
  <>
   <ul className='nav-list'>
    <li className='nav-item'>
     <Link to='/' className='link'>
      <h1>FashionStore</h1>
     </Link>
    </li>
    <li>
     <form onSubmit={searchProductHandler}>
      <input
       id='search_text'
       value={searchQuery}
       onChange={(e) => setSearchQuery(e.target.value)}
       type='text'
       placeholder='Search Products'
       name='q'
      />
      <input type='submit' hidden={true} />
     </form>
    </li>

    <li className='nav-item'>
     <Link to='/shoppingCart' className='link'>
      <FiShoppingBag size='1.5em' /> ({cartItems.length})
     </Link>
    </li>
    <li className='nav-item'>
     {userInfo ? (
      <Link to='/userDashBoard'>{userInfo.name}</Link>
     ) : (
      <Link to='/Login' className='link'>
       Sign In
      </Link>
     )}
     {userInfo && userInfo.isAdmin && (
      <Link to='/' onClick={logoutHandler} className='link'>
       LOGOUT
      </Link>
     )}
    </li>
   </ul>
  </>
 );
}

export default Navbar;
