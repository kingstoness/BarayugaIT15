import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";
import api from "../../api/axios";
import "../layout/layout.css";

export default function ProductCreate() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    product_code: "",
    product_name: "",
    price: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Auto-generate product code from Laravel
  useEffect(() => {
    api
      .get("/products/create")
      .then((res) => {
        setForm((f) => ({ ...f, product_code: res.data.productCode ?? "" }));
      })
      .catch(() => {});
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post("/products", form);
      navigate("/products");
    } catch (err) {
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors ?? {});
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="page-card" style={{ maxWidth: 520, margin: "0 auto" }}>
        <div className="page-header">
          <h1 className="page-title">Add New Product</h1>
          <Link to="/products" className="btn btn-outline">
            ← Back
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Product Code</label>
            <input
              className="form-control"
              name="product_code"
              value={form.product_code}
              readOnly
            />
          </div>

          <div className="form-group">
            <label>Product Name</label>
            <input
              className="form-control"
              name="product_name"
              value={form.product_name}
              onChange={handleChange}
              required
            />
            {errors.product_name && (
              <p className="error-text">{errors.product_name[0]}</p>
            )}
          </div>

          <div className="form-group">
            <label>Price (₱)</label>
            <input
              className="form-control"
              type="number"
              step="0.01"
              min="0"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
            />
            {errors.price && <p className="error-text">{errors.price[0]}</p>}
          </div>

          <button
            type="submit"
            className="btn btn-orange"
            disabled={submitting}
            style={{ width: "100%", justifyContent: "center" }}
          >
            {submitting ? "Saving…" : "Add Product"}
          </button>
        </form>
      </div>
    </Layout>
  );
}
