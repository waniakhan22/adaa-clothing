import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../api';
import './Admin.css';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    category: 'women'
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.price || !formData.image) {
      setError('Please fill all fields');
      return;
    }

    const createProduct = async () => {
      try {
        setIsLoading(true);
        await apiRequest('/api/products', {
          method: 'POST',
          body: JSON.stringify({
            name: formData.name,
            price: parseFloat(formData.price),
            oldPrice: parseFloat(formData.price) * 1.5,
            image: formData.image,
            category: formData.category,
            categoryDetails: `${formData.category.charAt(0).toUpperCase() + formData.category.slice(1)} | Premium`,
            badge: 'New',
          }),
        });
        setMessage('Product added successfully.');
        setTimeout(() => navigate('/products/manage'), 700);
      } catch (requestError) {
        setError(requestError.message);
      } finally {
        setIsLoading(false);
      }
    };

    createProduct();
  };

  return (
    <div>
      <h1 className="content-header">Add Product</h1>
      
      <div className="message success" style={{display: message ? 'block' : 'none', marginBottom: '1rem'}}>
        {message}
      </div>
      {error && <div className="message error" style={{marginBottom: '1rem'}}>{error}</div>}
      
      <div className="card" style={{maxWidth: '500px'}}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input 
              name="name"
              type="text" 
              value={formData.name}
              onChange={handleChange}
              placeholder="Product name"
              required 
            />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input 
              name="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              placeholder="99.99"
              required 
            />
          </div>
          <div className="form-group">
            <label>Image URL</label>
            <input 
              name="image"
              type="url" 
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              required 
            />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select name="category" value={formData.category} onChange={handleChange}>

              <option value="women">👗 Women</option>
              <option value="men">👔 Men</option>
              <option value="kids">👶 Kids</option>
              <option value="readyToWear">👗 Ready to Wear</option>
              <option value="tailored">👔 Tailored</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary" style={{width: '100%'}} disabled={isLoading}>
            {isLoading ? 'Adding...' : '➕ Add & Sync to Website'}
          </button>
        </form>
      </div>
      
      <div className="card" style={{marginTop: '2rem', background: '#fef3c7'}}>
        <h3 style={{color: '#92400e'}}>💡 Test Sync</h3>
        <p style={{color: '#92400e'}}>Added products appear immediately on main website (/women, /men, /kids). Delete from manage also removes from site.</p>
      </div>
    </div>
  );
};

export default AddProduct;

