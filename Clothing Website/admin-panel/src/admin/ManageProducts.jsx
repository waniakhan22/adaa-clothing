import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../api';
import './Admin.css';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({ name: '', price: '', image: '', category: 'women' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await apiRequest('/api/products');
      setProducts(data.products || []);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const deleteProduct = async (id) => {
    if (!confirm('Delete this product from website?')) return;

    try {
      await apiRequest(`/api/products/${id}`, { method: 'DELETE' });
      setProducts((current) => current.filter((product) => product._id !== id));
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  const startEditing = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    });
  };

  const saveProduct = async (event) => {
    event.preventDefault();
    try {
      setSaving(true);
      setError('');
      const data = await apiRequest(`/api/products/${selectedProduct._id}`, {
        method: 'PUT',
        body: JSON.stringify({
          name: formData.name,
          price: parseFloat(formData.price),
          image: formData.image,
          category: formData.category,
        }),
      });
      setProducts((current) => current.map((product) => product._id === data.product._id ? data.product : product));
      setSelectedProduct(null);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  };

  const addNew = () => {
    navigate('/products/add');
  };

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem'}}>
        <h1 className="content-header">Manage Products ({products.length})</h1>
        <button className="btn btn-primary" onClick={addNew}>
          ➕ Add New
        </button>
      </div>
      
      {error && <div className="message error" style={{marginBottom: '1rem'}}>{error}</div>}

      {selectedProduct && (
        <div className="card" style={{marginBottom: '1.5rem'}}>
          <h3>Edit Product</h3>
          <form onSubmit={saveProduct}>
            <div className="form-group"><label>Name</label><input value={formData.name} onChange={(event) => setFormData({...formData, name: event.target.value})} required /></div>
            <div className="form-group"><label>Price</label><input type="number" step="0.01" value={formData.price} onChange={(event) => setFormData({...formData, price: event.target.value})} required /></div>
            <div className="form-group"><label>Image URL</label><input type="url" value={formData.image} onChange={(event) => setFormData({...formData, image: event.target.value})} required /></div>
            <div className="form-group"><label>Category</label><select value={formData.category} onChange={(event) => setFormData({...formData, category: event.target.value})}><option value="women">Women</option><option value="men">Men</option><option value="kids">Kids</option><option value="readyToWear">Ready to Wear</option><option value="tailored">Tailored</option></select></div>
            <button className="btn btn-primary" type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</button>{' '}
            <button className="btn btn-secondary" type="button" onClick={() => setSelectedProduct(null)}>Cancel</button>
          </form>
        </div>
      )}

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Preview</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" style={{textAlign: 'center', padding: '3rem'}}>Loading products...</td></tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan="5" style={{textAlign: 'center', padding: '3rem', color: 'var(--text-muted)'}}>
                  No products yet. <button className="btn btn-primary" onClick={addNew}>Add first product</button>
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product._id}>
                  <td>
                    <img 
                      src={product.image} 
                      alt={product.name}
                      onError={(e) => e.target.src = 'https://via.placeholder.com/50?text=?'} 
                      style={{width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover'}}
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.categoryDetails || product.category}</td>
                  <td>
                    <div style={{display: 'flex', gap: '0.5rem'}}>
                      <button className="btn btn-secondary" onClick={() => startEditing(product)} style={{padding: '0.375rem 0.75rem'}}>Edit</button>
                      <button 
                        className="btn btn-danger" 
                        onClick={() => deleteProduct(product._id)}
                        style={{padding: '0.375rem 0.75rem'}}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      <div className="card" style={{marginTop: '2rem', background: '#ecfdf5'}}>
        <h3 style={{color: '#166534'}}>✅ Sync Confirmed</h3>
        <p style={{color: '#166534'}}>Changes here instantly update the main website products.</p>
      </div>
    </div>
  );
};

export default ManageProducts;

