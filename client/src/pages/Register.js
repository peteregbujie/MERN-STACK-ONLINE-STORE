import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { register } from '../actions/userActions';
import {
 Button,
 Form,
 FormInput,
 NavLink,
 Spinner,
 Subtitle,
 Title,
} from '../globalStyles';

const Register = () => {
 let location = useLocation();
 let history = useHistory();
 const [userData, setUserData] = useState({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
 });

 const userRegister = useSelector((state) => state.userRegister);
 const { loading, userInfo, error } = userRegister;
 const dispatch = useDispatch();

 const redirect = location.search ? location.search.split('=')[1] : '/';

 useEffect(() => {
  if (userInfo) {
   history.push(redirect);
  }
  return () => {};
 }, [history, redirect, userInfo]);

 const handleChange = (name) => (event) => {
  setUserData({ ...userData, [name]: event.target.value });
 };

 const SubmitHandler = (event) => {
  event.preventDefault();
  if (userData.password !== userData.confirmPassword) {
   return;
  }
  dispatch(register(userData));
 };
 return (
  <>
   <Form onSubmit={SubmitHandler}>
    <Title>Register</Title>
    {loading && <Spinner alt='loading' />}
    {error && <div>{error}</div>}
    <FormInput
     type='text'
     value={userData.name}
     placeholder='Enter Name'
     name='name'
     onChange={handleChange}
    />
    <FormInput
     type='email'
     name='email'
     value={userData.email}
     placeholder='Enter Email'
     onChange={handleChange}
    />

    <FormInput
     type='password'
     placeholder='Password'
     name='password'
     value={userData.password}
     onChange={handleChange}
    />
    <FormInput
     type='password'
     placeholder='Confirm Password'
     name='confirmPassword'
     value={userData.confirmPassword}
     onChange={handleChange}
    />
    <Button type='submit'>Register</Button>

    <Subtitle>Already have an account?</Subtitle>
    <NavLink to='/Login'>Sign In</NavLink>
   </Form>
  </>
 );
};

export default Register;
