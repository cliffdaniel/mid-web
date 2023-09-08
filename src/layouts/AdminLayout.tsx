import React from 'react';
import AdminHeader from '../components/admin/AdminHeader';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />
      <div className="container p-4 mx-auto">{children}</div>
    </div>
  );
};

export default AdminLayout;
