import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout from '../layout/Layout';
import api from '../../api/axios';
import '../layout/layout.css';

export default function ProductShow() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/products/${id}`).then((res) => {
      setProduct(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [id]);

  if (loading) return <Layout><div className="loading">Loading…</div></Layout>;
  if (!product) return <Layout><div className="loading">Product not found.</div></Layout>;

  return (
    <Layout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 800 }}>
        <div className="page-card">
          <div className="page-header">
            <h1 className="page-title">Product Details</h1>
            <Link to="/products" className="btn btn-outline">← Back to Products</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <p style={{ fontSize: '0.8rem', color: '#aaa', marginBottom: 2 }}>CODE</p>
              <p style={{ fontWeight: 600 }}>{product.product_code}</p>
            </div>
            <div>
              <p style={{ fontSize: '0.8rem', color: '#aaa', marginBottom: 2 }}>NAME</p>
              <p style={{ fontWeight: 600 }}>{product.product_name}</p>
            </div>
            <div>
              <p style={{ fontSize: '0.8rem', color: '#aaa', marginBottom: 2 }}>PRICE</p>
              <p style={{ fontWeight: 600 }}>₱ {parseFloat(product.price).toFixed(2)}</p>
            </div>
            <div>
              <p style={{ fontSize: '0.8rem', color: '#aaa', marginBottom: 2 }}>CURRENT STOCK</p>
              <p style={{ fontWeight: 600 }}>{product.current_stock ?? 0}</p>
            </div>
          </div>
        </div>

        <div className="page-card">
          <h3 className="section-title" style={{ fontFamily: 'Syne, sans-serif', marginBottom: 16 }}>Stock History & Suppliers</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Supplier</th>
                <th>Reference</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {(!product.suppliers || product.suppliers.length === 0) ? (
                <tr className="empty-row"><td colSpan={4}>No history recorded.</td></tr>
              ) : product.suppliers.map((s, i) => (
                <tr key={i}>
                  <td>{new Date(s.pivot?.created_at).toLocaleString('en-PH')}</td>
                  <td>{s.supplier_name}</td>
                  <td>{s.pivot?.delivery_reference}</td>
                  <td><span className="badge badge-green">+ {s.pivot?.quantity}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
