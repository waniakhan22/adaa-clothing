import React, { useEffect, useState } from 'react';
import { apiRequest } from '../api';
import './Admin.css';

const statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);
  const [error, setError] = useState('');

  const loadOrders = async () => {
    try {
      setError('');
      const data = await apiRequest('/api/orders');
      setOrders(data.orders || []);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      setSavingId(id);
      setError('');
      const data = await apiRequest(`/api/orders/${id}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
      });
      setOrders((current) => current.map((order) => order._id === id ? data.order : order));
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div>
      <h1 className="content-header">Orders Management</h1>
      {error && <div className="message error" style={{marginBottom: '1rem'}}>{error}</div>}
      <div className="table-container">
        <table className="table">
          <thead>
            <tr><th>Customer</th><th>Items</th><th>Total</th><th>Date</th><th>Status</th></tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" style={{textAlign: 'center', padding: '3rem'}}>Loading orders...</td></tr>
            ) : orders.length === 0 ? (
              <tr><td colSpan="5" style={{textAlign: 'center', padding: '3rem'}}>No orders found.</td></tr>
            ) : orders.map((order) => (
              <tr key={order._id}>
                <td>{order.user?.name || order.user?.email || 'Unknown'}</td>
                <td>{order.items?.reduce((total, item) => total + item.quantity, 0) || 0}</td>
                <td>Rs. {order.totalAmount?.toLocaleString()}</td>
                <td>{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'Unknown'}</td>
                <td>
                  <select value={order.status} disabled={savingId === order._id} onChange={(event) => updateStatus(order._id, event.target.value)}>
                    {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
