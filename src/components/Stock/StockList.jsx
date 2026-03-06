import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../layout/Layout";
import api from "../../api/axios";
import "../layout/layout.css";

export default function StockList() {
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/stock")
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : (res.data.data ?? []);
        setSummary(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <Layout>
      <div className="page-card">
        <div className="page-header">
          <h1 className="page-title">Stock Summary</h1>
          <Link to="/stock/create" className="btn btn-orange">
            ➕ Add Stock
          </Link>
        </div>

        {loading ? (
          <div className="loading">Loading…</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Supplier Name</th>
                <th>Total Delivered</th>
                <th>Last Delivery</th>
              </tr>
            </thead>
            <tbody>
              {summary.length === 0 ? (
                <tr className="empty-row">
                  <td colSpan={4}>No stock records found.</td>
                </tr>
              ) : (
                summary.map((record, i) => (
                  <tr key={i}>
                    <td>{record.product?.product_name ?? "—"}</td>
                    <td>{record.supplier?.supplier_name ?? "—"}</td>
                    <td>
                      <span className="badge badge-green">
                        {record.quantity}
                      </span>
                    </td>
                    <td>
                      {record.created_at
                        ? new Date(record.created_at).toLocaleDateString(
                            "en-PH",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            },
                          )
                        : "—"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
}
