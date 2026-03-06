import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './sidebar.css';

const navItems = [
  { to: '/dashboard',        label: 'Dashboard',    icon: '⊞' },
  { to: '/products',         label: 'Products',     icon: '🛒' },
  { to: '/suppliers',        label: 'Suppliers',    icon: '🏭' },
  { to: '/stock',            label: 'Stock',        icon: '📦' },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="brand-icon">🍽</span>
        <span className="brand-text">Canteen<em>Pro</em></span>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          <span>⏻</span> Logout
        </button>
      </div>
    </aside>
  );
}
