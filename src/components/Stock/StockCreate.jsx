import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";
import api from "../../api/axios";
import "../layout/layout.css";

export default function StockCreate() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [form, setForm] = useState({
    product_id: "",
    supplier_id: "",
    quantity: "",
    delivery_reference: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    Promise.all([api.get("/products"), api.get("/suppliers")]).then(
      ([p, s]) => {
        setProducts(Array.isArray(p.data) ? p.data : (p.data.data ?? []));
        setSuppliers(Array.isArray(s.data) ? s.data : (s.data.data ?? []));
      },
    );
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post("/stock", form);
      navigate("/stock");
    } catch (err) {
      if (err.response?.status === 422)
        setErrors(err.response.data.errors ?? {});
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="page-card" style={{ maxWidth: 520, margin: "0 auto" }}>
        <div className="page-header">
          <h1 className="page-title">Add Stock Entry</h1>
          <Link to="/stock" className="btn btn-outline">
            ← Back
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Product</label>
            <select
              className="form-control"
              name="product_id"
              value={form.product_id}
              onChange={handleChange}
              required
            >
              <option value="">Select Product</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.product_name}
                </option>
              ))}
            </select>
            {errors.product_id && (
              <p className="error-text">{errors.product_id[0]}</p>
            )}
          </div>

          <div className="form-group">
            <label>Supplier</label>
            <select
              className="form-control"
              name="supplier_id"
              value={form.supplier_id}
              onChange={handleChange}
              required
            >
              <option value="">Select Supplier</option>
              {suppliers.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.supplier_name}
                </option>
              ))}
            </select>
            {errors.supplier_id && (
              <p className="error-text">{errors.supplier_id[0]}</p>
            )}
          </div>

          <div className="form-group">
            <label>Quantity</label>
            <input
              className="form-control"
              type="number"
              name="quantity"
              min="1"
              value={form.quantity}
              onChange={handleChange}
              required
            />
            {errors.quantity && (
              <p className="error-text">{errors.quantity[0]}</p>
            )}
          </div>

          <div className="form-group">
            <label>Delivery Reference</label>
            <input
              className="form-control"
              type="text"
              name="delivery_reference"
              value={form.delivery_reference}
              onChange={handleChange}
              required
            />
            {errors.delivery_reference && (
              <p className="error-text">{errors.delivery_reference[0]}</p>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-orange"
            disabled={submitting}
            style={{ width: "100%", justifyContent: "center" }}
          >
            {submitting ? "Saving…" : "Add Stock"}
          </button>
        </form>
      </div>
    </Layout>
  );
}
