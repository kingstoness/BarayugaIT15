import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Auth/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import ProductList from "./components/Product/ProductList";
import ProductCreate from "./components/Product/ProductCreate";
import ProductShow from "./components/Product/ProductShow";
import SupplierList from "./components/Supplier/SupplierList";
import SupplierCreate from "./components/Supplier/SupplierCreate";
import SupplierShow from "./components/Supplier/SupplierShow";
import StockList from "./components/Stock/StockList";
import StockCreate from "./components/Stock/StockCreate";

// Protects routes — redirects to /login if no token in localStorage
function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/products"
        element={
          <PrivateRoute>
            <ProductList />
          </PrivateRoute>
        }
      />
      <Route
        path="/products/create"
        element={
          <PrivateRoute>
            <ProductCreate />
          </PrivateRoute>
        }
      />
      <Route
        path="/products/:id"
        element={
          <PrivateRoute>
            <ProductShow />
          </PrivateRoute>
        }
      />
      <Route
        path="/suppliers"
        element={
          <PrivateRoute>
            <SupplierList />
          </PrivateRoute>
        }
      />
      <Route
        path="/suppliers/create"
        element={
          <PrivateRoute>
            <SupplierCreate />
          </PrivateRoute>
        }
      />
      <Route
        path="/suppliers/:id"
        element={
          <PrivateRoute>
            <SupplierShow />
          </PrivateRoute>
        }
      />
      <Route
        path="/stock"
        element={
          <PrivateRoute>
            <StockList />
          </PrivateRoute>
        }
      />
      <Route
        path="/stock/create"
        element={
          <PrivateRoute>
            <StockCreate />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
