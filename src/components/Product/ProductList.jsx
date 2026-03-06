import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../layout/Layout';
import api from '../../api/axios';
import '../layout/layout.css';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/products').then((res) => {
      const data = Array.isArray(res.data) ? res.data : (res.data.data ?? []);
      setProducts(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return (
    <Layout>
      <div className="page-card">
        <div className="page-header">
          <h1 className="page-title">Products</h1>
          <Link to="/products/create" className="btn btn-orange">➕ Add Product</Link>
        </div>

        {loading ? (
          <div className="loading">Loading…</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Name</th>
                <th>Price</th>
                <th>Current Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr className="empty-row"><td colSpan={5}>No products found.</td></tr>
              ) : products.map((p) => (
                <tr key={p.id}>
                  <td><span className="badge badge-gray">{p.product_code}</span></td>
                  <td>{p.product_name}</td>
                  <td>₱ {parseFloat(p.price).toFixed(2)}</td>
                  <td>{p.current_stock ?? 0}</td>
                  <td>
                    <Link to={`/products/${p.id}`} className="btn btn-primary btn-sm">View Details</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
}
