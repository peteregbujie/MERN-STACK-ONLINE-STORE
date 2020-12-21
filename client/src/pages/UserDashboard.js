import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { listMyOrders } from '../actions/orderActions';
import { logout, update } from '../actions/userActions';
import { Button } from '../globalStyles';

const UserDashboard = () => {
 let history = useHistory();
 const [name, setName] = useState('');
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [confirmPassword, setConfirmPassword] = useState('');
 const [address, setAddress] = useState('');
 const [city, setCity] = useState('');
 const [userState, setUserState] = useState('');
 const [zipCode, setZipCode] = useState('');

 const dispatch = useDispatch();

 const userLogin = useSelector((state) => state.userLogin);
 const { userInfo } = userLogin;

 const userUpdate = useSelector((state) => state.userUpdate);
 const { loading, success, error } = userUpdate;

 const userOrderList = useSelector((state) => state.userOrderList);
 const { loading: loadingOrders, orders, error: errorOrders } = userOrderList;

 const handleLogout = () => {
  dispatch(logout());
  history.push('/login');
 };

 const submitHandler = (e) => {
  e.preventDefault();
  dispatch(
   update({
    userId: userInfo._id,
    email,
    name,
    password,
    address,
    city,
    userState,
    zipCode,
   })
  );
 };

 useEffect(() => {
  if (userInfo) {
   setEmail(userInfo.email);
   setName(userInfo.Name);
   setPassword(userInfo.password);
   setAddress(userInfo.setAddress);
   setCity(userInfo.city);
   setUserState(userInfo.userState);
   setZipCode(userInfo.zipCode);
  }
  dispatch(listMyOrders());
  return () => {};
 }, [userInfo, dispatch]);

 return (
  <>
   <div>
    <div>
     <form onSubmit={submitHandler}>
      <ul>
       <li>
        <h2>User Profile</h2>
       </li>
       <li>
        {loading && <div>Loading...</div>}
        {error && <div>{error}</div>}
        {success && <div>Profile Updated Successfully.</div>}
       </li>

       <li>
        <input
         type='text'
         name='Name'
         placeholder='Name'
         value={name}
         onChange={(e) => setName(e.target.value)}
        />
       </li>
       <li>
        <input
         type='email'
         name='email'
         placeholder='Email'
         value={email}
         onChange={(e) => setEmail(e.target.value)}
        />
       </li>
       <li>
        <input
         type='password'
         placeholder='Password'
         name='password'
         value={password}
         onChange={(e) => setPassword(e.target.value)}
        />
       </li>
       <li>
        <input
         type='password'
         placeholder='Confirm Password'
         name='confirmPassword'
         value={confirmPassword}
         onChange={(e) => setConfirmPassword(e.target.value)}
        />
       </li>

       <li>
        <input
         type='text'
         name='address'
         placeholder='Address'
         value={address}
         onChange={(e) => setAddress(e.target.value)}
        />
       </li>

       <li>
        <input
         type='text'
         name='city'
         placeholder='City'
         value={city}
         onChange={(e) => setCity(e.target.value)}
        />
       </li>

       <li>
        <input
         type='text'
         name='state'
         placeholder='State'
         value={userState}
         onChange={(e) => setUserState(e.target.value)}
        />
       </li>

       <li>
        <input
         type='text'
         name='zipCode'
         placeholder='Zip Code'
         value={zipCode}
         onChange={(e) => setZipCode(e.target.value)}
        />
       </li>

       <li>
        <Button type='submit'>Update</Button>
       </li>
       <li>
        <Button type='button' onClick={handleLogout}>
         Logout
        </Button>
       </li>
      </ul>
     </form>
    </div>
   </div>
   <div>
    {loadingOrders ? (
     <div>Loading...</div>
    ) : errorOrders ? (
     <div>{errorOrders} </div>
    ) : (
     <table className='table'>
      <thead>
       <tr>
        <th>ID</th>
        <th>DATE</th>
        <th>TOTAL</th>
        <th>PAID</th>
        <th>ACTIONS</th>
       </tr>
      </thead>
      <tbody>
       {orders.map((order) => (
        <tr key={order._id}>
         <td>{order._id}</td>
         <td>{order.createdAt}</td>
         <td>{order.totalPrice}</td>
         <td>{order.isPaid}</td>
         <td>
          <Link to={'/order/' + order._id}> ORDER DETAILS</Link>
         </td>
        </tr>
       ))}
      </tbody>
     </table>
    )}
   </div>
  </>
 );
};

export default UserDashboard;
