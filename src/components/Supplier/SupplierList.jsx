import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../layout/Layout';
import api from '../../api/axios';
import '../layout/layout.css';

export default function SupplierList() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/suppliers').then((res) => {
      const data = Array.isArray(res.data) ? res.data : (res.data.data ?? []);
      setSuppliers(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return (
    <Layout>
      <div className="page-card">
        <div className="page-header">
          <h1 className="page-title">Suppliers</h1>
          <Link to="/suppliers/create" className="btn btn-orange">➕ Add Supplier</Link>
        </div>

        {loading ? <div className="loading">Loading…</div> : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Name</th>
                <th>Email</th>
                <th>Contact Number</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.length === 0 ? (
                <tr className="empty-row"><td colSpan={4}>No suppliers found.</td></tr>
              ) : suppliers.map((s) => (
                <tr key={s.id}>
                  <td><span className="badge badge-blue">{s.supplier_code}</span></td>
                  <td>
                    <Link to={`/suppliers/${s.id}`} style={{ color: '#f97316', fontWeight: 600, textDecoration: 'none' }}>
                      {s.supplier_name}
                    </Link>
                  </td>
                  <td>{s.contact_email}</td>
                  <td>{s.contact_number}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
}
