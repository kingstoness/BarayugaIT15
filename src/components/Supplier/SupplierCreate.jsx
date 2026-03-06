import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";
import api from "../../api/axios";
import "../layout/layout.css";

export default function SupplierCreate() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    supplier_code: "",
    supplier_name: "",
    contact_email: "",
    contact_number: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api
      .get("/suppliers/create")
      .then((res) => {
        setForm((f) => ({ ...f, supplier_code: res.data.supplierCode ?? "" }));
      })
      .catch(() => {});
  }, []);

  const handleChange = (e) => {
    let val = e.target.value;
    if (e.target.name === "contact_number")
      val = val.replace(/[^0-9]/g, "").slice(0, 11);
    setForm({ ...form, [e.target.name]: val });
    setErrors({ ...errors, [e.target.name]: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post("/suppliers", form);
      navigate("/suppliers");
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
          <h1 className="page-title">Add New Supplier</h1>
          <Link to="/suppliers" className="btn btn-outline">
            ← Back
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Supplier Code</label>
            <input
              className="form-control"
              name="supplier_code"
              value={form.supplier_code}
              readOnly
            />
          </div>
          <div className="form-group">
            <label>Supplier Name</label>
            <input
              className="form-control"
              name="supplier_name"
              value={form.supplier_name}
              onChange={handleChange}
              required
            />
            {errors.supplier_name && (
              <p className="error-text">{errors.supplier_name[0]}</p>
            )}
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              className="form-control"
              type="email"
              name="contact_email"
              value={form.contact_email}
              onChange={handleChange}
              required
            />
            {errors.contact_email && (
              <p className="error-text">{errors.contact_email[0]}</p>
            )}
          </div>
          <div className="form-group">
            <label>Contact Number</label>
            <input
              className="form-control"
              type="tel"
              name="contact_number"
              value={form.contact_number}
              onChange={handleChange}
              maxLength={11}
              placeholder="09XXXXXXXXX"
              required
            />
            {errors.contact_number && (
              <p className="error-text">{errors.contact_number[0]}</p>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-orange"
            disabled={submitting}
            style={{ width: "100%", justifyContent: "center" }}
          >
            {submitting ? "Saving…" : "Add Supplier"}
          </button>
        </form>
      </div>
    </Layout>
  );
}
