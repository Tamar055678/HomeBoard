import React, { useState } from 'react';
import '../css/AddTenant.css';

const AddTenant = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    apartment_id: ''
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError('');

    try {
      const res = await fetch('http://localhost:3001/api/tenants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to add tenant');
      }

      setSuccess(true);
      setFormData({ name: '', phone: '', email: '', apartment_id: '' });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="add-tenant-container">
      <h2>Add Tenant</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>

        <label>Phone:
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
        </label>

        <label>Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>

        <label>Apartment ID:
          <input type="number" name="apartment_id" value={formData.apartment_id} onChange={handleChange} />
        </label>

        <button type="submit">Add Tenant</button>
      </form>

      {success && <p className="success">Tenant added successfully!</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default AddTenant;
