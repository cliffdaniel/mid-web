import React from 'react';
import Link from 'next/link';

const AdminHeader: React.FC = () => {
  return (
    <header className="p-4 bg-blue-500">
      <nav className="container mx-auto">
        <ul className="flex space-x-4">
          <li>
            <Link href="/admin">Dashboard</Link>
          </li>
          <li>
            <Link href="/admin/projects">Projects</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AdminHeader;
