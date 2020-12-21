import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteOrder } from '../actions/orderActions';

const Orderspage = () => {
  const orderList = useSelector((state) => state.orderlist);
  const { loading: loadingOrders, orders, error: orderError } = orderList;

  const orderDelete = useSelector((state) => state.orderDelete);

  const { loading, success: successDelete, error } = orderDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(lisOrders());
    return () => {};
  }, [successDelete]);

  const deleteHandler = (order) => {
    dispatch(deleteOrder(order._id));
  };
  return loadingOrders ? (
    <div>Loading...</div>
  ) : (
    <div className='content content-margined'>
      <div className='order-header'>
        <h3> All Orders</h3>
      </div>
      <div className='order-list'>
        <table className='table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>USER</th>
              <th>PAID</th>
              <th>PAID AT</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt}</td>
                <td>{order.totalPrice}</td>
                <td>{order.user.name}</td>
                <td>{order.isPaid.toString()}</td>
                <td>{order.paidAt}</td>
                <td>
                  <Link to={'/order/' + order._id} className='button secondary'>
                    Details
                  </Link>{' '}
                  <button
                    type='button'
                    onClick={() => deleteHandler(order)}
                    className='button secondary'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default OrdersScreen;
