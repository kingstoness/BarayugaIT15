import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout from '../layout/Layout';
import api from '../../api/axios';
import '../layout/layout.css';

export default function SupplierShow() {
  const { id } = useParams();
  const [supplier, setSupplier] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/suppliers/${id}`).then((res) => {
      setSupplier(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [id]);

  if (loading) return <Layout><div className="loading">Loading…</div></Layout>;
  if (!supplier) return <Layout><div className="loading">Supplier not found.</div></Layout>;

  return (
    <Layout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 800 }}>
        <div className="page-card">
          <div className="page-header">
            <h1 className="page-title">{supplier.supplier_name}</h1>
            <Link to="/suppliers" className="btn btn-outline">← Back to Suppliers</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            <div>
              <p style={{ fontSize: '0.8rem', color: '#aaa', marginBottom: 2 }}>CODE</p>
              <p style={{ fontWeight: 600 }}>{supplier.supplier_code}</p>
            </div>
            <div>
              <p style={{ fontSize: '0.8rem', color: '#aaa', marginBottom: 2 }}>EMAIL</p>
              <p style={{ fontWeight: 600 }}>{supplier.contact_email}</p>
            </div>
            <div>
              <p style={{ fontSize: '0.8rem', color: '#aaa', marginBottom: 2 }}>CONTACT</p>
              <p style={{ fontWeight: 600 }}>{supplier.contact_number}</p>
            </div>
          </div>
        </div>

        <div className="page-card">
          <h3 className="section-title" style={{ fontFamily: 'Syne, sans-serif', marginBottom: 16 }}>Products Supplied</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity Delivered</th>
              </tr>
            </thead>
            <tbody>
              {(!supplier.products || supplier.products.length === 0) ? (
                <tr className="empty-row"><td colSpan={2}>No products supplied yet.</td></tr>
              ) : supplier.products.map((p, i) => (
                <tr key={i}>
                  <td>{p.product_name}</td>
                  <td><span className="badge badge-green">+ {p.pivot?.quantity}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
