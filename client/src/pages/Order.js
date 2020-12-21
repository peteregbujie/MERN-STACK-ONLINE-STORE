import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getOrderDetails } from '../actions/orderActions';
import {
 Container,
 Info,
 List,
 ListItem,
 NavLink,
 Spinner,
 Subtitle,
 Title,
} from '../globalStyles';

const CustomTable = styled.table`
 width: 100%;
 border: 1px solid black;
 border-collapse: collapse;
 th,
 td {
  border: 1px solid black;
  border-collapse: collapse;
  padding: 12px 15px;
 }
 th,
 td,
 tr {
  padding: 5px;
 }
 th {
  text-align: left;
 }
`;

const Order = (props) => {
 const dispatch = useDispatch();

 useEffect(() => {
  dispatch(getOrderDetails(props.match.params.id));
  return () => {};
 }, [dispatch, props.match.params.id]);

 const orderDetails = useSelector((state) => state.orderDetails);
 const { loading, order, error } = orderDetails;

 return loading ? (
  <Spinner alt='loading' />
 ) : error ? (
  <div>{error}</div>
 ) : (
  <Container>
   <Subtitle>Thank you for Your Order</Subtitle>

   <Title>Shipping</Title>
   <List>
    <ListItem>{order.shipping.name}</ListItem>,
    <ListItem>{order.shipping.address}</ListItem>,
    <ListItem>{order.shipping.city}</ListItem>,
    <ListItem>{order.shipping.zipCode}</ListItem>
    <ListItem>{order.shipping.state}</ListItem>,
   </List>

   <CustomTable>
    <tr>
     <th>Products</th>
     <th>Price</th>
     <th>Quantity</th>
    </tr>
    {order.orderItems.length === 0 ? (
     <Info>Cart is empty</Info>
    ) : (
     order.orderItems.map((item) => (
      <tr key={item._id}>
       <td>
        <NavLink to={'/product/' + item.product}>{item.name}</NavLink>
       </td>

       <td>
        {' '}
        <Info>Quantity: {item.quantity}</Info>
       </td>

       <td>
        {' '}
        <Info>${item.price}</Info>
       </td>
      </tr>
     ))
    )}
   </CustomTable>

   <List>
    <Info>Order Summary</Info>

    <Info>Products Price</Info>
    <ListItem>${order.productsPrice}</ListItem>

    <Info>Shipping</Info>
    <ListItem>${order.shippingFee}</ListItem>

    <Info>Tax</Info>
    <ListItem>${order.tax}</ListItem>

    <Info>Order Total</Info>
    <ListItem>${order.total}</ListItem>
   </List>

   <NavLink to='/userDashboard'>Go To My Profile</NavLink>
  </Container>
 );
};

export default Order;
