import React, { useEffect, useState } from 'react';
import '../css/TenantsTable.css';

const TenantsTable = () => {
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/tenants')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => {
        setTenants(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching tenants:', err);
        setError(err.message || 'Unknown error');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>טוען נתונים...</p>;
  if (error) return <p>שגיאה בטעינת הדיירים: {error}</p>;

  return (
    <div className="tenants-table">
      <h2>רשימת דיירים</h2>
      <table>
        <thead>
          <tr>
            <th>מספר מזהה</th>
            <th>שם</th>
            <th>טלפון</th>
            <th>אימייל</th>
            <th>מספר דירה</th>
          </tr>
        </thead>
        <tbody>
          {tenants.map((tenant) => (
            <tr key={tenant.id}>
              <td>{tenant.id}</td>
              <td>{tenant.name}</td>
              <td>{tenant.phone}</td>
              <td>{tenant.email}</td>
              <td>{tenant.apartment_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TenantsTable;
