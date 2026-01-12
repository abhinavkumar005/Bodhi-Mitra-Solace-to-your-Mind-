// src/components/layout/AdminLayout.jsx
import { Outlet } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Outlet /> {/* Renders <AdminDashboard /> */}
    </div>
  );
}