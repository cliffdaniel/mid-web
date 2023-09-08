import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin/login');
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="px-4 py-12 sm:px-6 lg:px-8">
      <header className="">
        <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">Panel de Administración</h1>
        </div>
      </header>

      <main>
        <div className="py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="px-4 py-6 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800">¡Bienvenido!</h2>
            <p className="mt-2 text-gray-600">Gestiona tus contenidos aquí.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
