import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import GlobalStyle from './globalStyles';
import {
 HomePage,
 LoginPage,
 Order,
 Product,
 ProductList,
 Register,
 Shipping,
 ShoppingCart,
 UserDashboard,
} from './pages';
import CheckoutPage from './pages/CheckoutPage';

function App() {
 const { search } = window.location;
 const query = new URLSearchParams(search).get('searchTerm');
 const [searchQuery, setSearchQuery] = useState(query || '');

 return (
  <Router>
   <GlobalStyle />
   <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

   <Switch>
    <>
     <Route exact path='/search/:searchQuery'>
      <HomePage />
     </Route>
     <Route exact path='/'>
      <HomePage />
     </Route>
     <Route path='/category/:category'>
      <HomePage />
     </Route>
     <Route path='/product/:id'>
      {' '}
      <Product />
     </Route>
     <Route path='/productlist'>
      {' '}
      <ProductList />
     </Route>
     <Route path='/login'>
      {' '}
      <LoginPage />
     </Route>
     <Route path='/register'>
      {' '}
      <Register />
     </Route>
     <Route path='/userDashboard'>
      {' '}
      <UserDashboard />
     </Route>
     <Route path='/order/:id'>
      {' '}
      <Order />
     </Route>
     <Route path='/shoppingCart'>
      {' '}
      <ShoppingCart />
     </Route>
     <Route path='/checkoutPage'>
      {' '}
      <CheckoutPage />
     </Route>
     <Route path='/shipping'>
      {' '}
      <Shipping />
     </Route>
    </>
   </Switch>
   <Footer />
  </Router>
 );
}

export default App;
