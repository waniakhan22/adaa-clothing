import React, { useState, useEffect } from 'react';
import { apiRequest } from '../api';
import './Admin.css';

const Carts = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadCarts = async () => {
      try {
        const data = await apiRequest('/api/admin/carts');
        setCartItems(data.carts || []);
      } catch (requestError) {
        setError(requestError.message);
      } finally {
        setLoading(false);
      }
    };
    loadCarts();
  }, []);

  return (
    <div>
      <h1 className="content-header">Shopping Carts</h1>
      {error && <div className="message error" style={{marginBottom: '1rem'}}>{error}</div>}
      <div className="card" style={{marginBottom: '1.5rem'}}><h3>Active Carts: {cartItems.length}</h3></div>
      
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="4" style={{textAlign: 'center', padding: '3rem'}}>Loading carts...</td></tr>
            ) : cartItems.length === 0 ? (
              <tr>
                <td colSpan="4" style={{textAlign: 'center', padding: '3rem'}}>
                  Cart is empty
                </td>
              </tr>
            ) : (
              cartItems.flatMap((cart) => cart.items.map((item) => (
                <tr key={`${cart._id}-${item._id}`}>
                  <td>{cart.user?.name || cart.user?.email || 'Unknown'}: {item.name}</td>
                  <td>Rs. {item.price?.toLocaleString()}</td>
                  <td>{item.quantity}</td>
                  <td>Rs. {((item.price || 0) * item.quantity).toLocaleString()}</td>
                </tr>
              )))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Carts;

