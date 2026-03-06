import React from 'react';
import Sidebar from './Sidebar';
import './layout.css';

export default function Layout({ children }) {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="app-main">
        {children}
      </main>
    </div>
  );
}
