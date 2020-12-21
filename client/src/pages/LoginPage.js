import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { login } from '../actions/userActions';
import {
 Button,
 Form,
 FormInput,
 NavLink,
 Spinner,
 Title,
} from '../globalStyles';

const LoginPage = () => {
 let location = useLocation();
 let history = useHistory();

 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');

 const userLogin = useSelector((state) => state.userLogin);
 const { loading, userInfo, error } = userLogin;

 const dispatch = useDispatch();

 const redirect = location.search ? location.search.split('=')[1] : '/';

 useEffect(() => {
  if (userInfo) {
   history.push(redirect);
  }
  return () => {
   //
  };
 }, [history, redirect, userInfo]);

 const SubmitHandler = (e) => {
  e.preventDefault();
  dispatch(login(email, password));
 };

 return (
  <>
   <Form onSubmit={SubmitHandler}>
    <Title>Login</Title>
    {loading && <Spinner alt='loading' />}
    {error && <div>{error}</div>}
    <FormInput
     type='email'
     required
     name='email'
     value={email}
     placeholder='Enter Email'
     onChange={(e) => setEmail(e.target.value)}
    />
    <FormInput
     type='password'
     required
     value={password}
     placeholder='Enter Password'
     name='password'
     onChange={(e) => setPassword(e.target.value)}
    />
    <Button type='submit'>Login</Button>

    <NavLink
     to={redirect === '/' ? 'register' : 'register?redirect=' + redirect}
    >
     Create An Account
    </NavLink>
   </Form>
  </>
 );
};

export default LoginPage;
