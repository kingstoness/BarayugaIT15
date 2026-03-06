import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import api from "../../api/axios";
import "./dashboard.css";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get("/products").catch(() => ({ data: [] })),
      api.get("/suppliers").catch(() => ({ data: [] })),
      api.get("/stock").catch(() => ({ data: [] })),
    ])
      .then(([products, suppliers, stock]) => {
        const productList = Array.isArray(products.data)
          ? products.data
          : (products.data.data ?? []);
        const supplierList = Array.isArray(suppliers.data)
          ? suppliers.data
          : (suppliers.data.data ?? []);
        const stockList = Array.isArray(stock.data)
          ? stock.data
          : (stock.data.data ?? []);

        const totalStock = stockList.reduce(
          (sum, s) => sum + (s.total_quantity ?? 0),
          0
        );

        setStats({
          products: productList.length,
          suppliers: supplierList.length,
          stockEntries: stockList.length,
          totalStock,
          recentProducts: productList.slice(0, 5),
        });
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout>
      <div className="dashboard">
        <div className="dash-header">
          <div>
            <h1 className="dash-title">Dashboard</h1>
            <p className="dash-sub">Canteen Management Overview</p>
          </div>
          <div className="dash-date">
            {new Date().toLocaleDateString("en-PH", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>

        {loading ? (
          <div className="loading">Loading stats…</div>
        ) : (
          <>
            <div className="stat-grid">
              <div className="stat-card orange">
                <div className="stat-icon">🛒</div>
                <div className="stat-info">
                  <span className="stat-label">Total Products</span>
                  <span className="stat-value">{stats.products}</span>
                </div>
              </div>
              <div className="stat-card blue">
                <div className="stat-icon">🏭</div>
                <div className="stat-info">
                  <span className="stat-label">Suppliers</span>
                  <span className="stat-value">{stats.suppliers}</span>
                </div>
              </div>
              <div className="stat-card green">
                <div className="stat-icon">📦</div>
                <div className="stat-info">
                  <span className="stat-label">Stock Entries</span>
                  <span className="stat-value">{stats.stockEntries}</span>
                </div>
              </div>
              <div className="stat-card purple">
                <div className="stat-icon">📊</div>
                <div className="stat-info">
                  <span className="stat-label">Total Units Stocked</span>
                  <span className="stat-value">{stats.totalStock}</span>
                </div>
              </div>
            </div>

            <div className="dash-grid">
              <div className="page-card">
                <h3 className="section-title">Recent Products</h3>
                {stats.recentProducts.length === 0 ? (
                  <p className="no-data">No products yet.</p>
                ) : (
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Stock</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.recentProducts.map((p) => (
                        <tr key={p.id}>
                          <td>
                            <span className="badge badge-gray">
                              {p.product_code}
                            </span>
                          </td>
                          <td>{p.product_name}</td>
                          <td>₱ {parseFloat(p.price).toFixed(2)}</td>
                          <td>{p.current_stock ?? 0}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              <div className="page-card">
                <h3 className="section-title">Quick Links</h3>
                <div className="quick-links">
                  <a href="/products/create" className="quick-link">
                    <span>🛒</span>
                    <div>
                      <strong>Add Product</strong>
                      <p>Register a new product</p>
                    </div>
                  </a>
                  <a href="/suppliers/create" className="quick-link">
                    <span>🏭</span>
                    <div>
                      <strong>Add Supplier</strong>
                      <p>Register a new supplier</p>
                    </div>
                  </a>
                  <a href="/stock/create" className="quick-link">
                    <span>📦</span>
                    <div>
                      <strong>Add Stock</strong>
                      <p>Record a new delivery</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
