import React from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';

interface AuthRouteProps {
  children: React.ReactNode;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
  const router = useRouter();
  const authContext = useAuth();

  if (!authContext || !authContext.isAuthenticated) {
    router.push('/admin/login');
    return null;
  }

  return <>{children}</>;
};

export default AuthRoute;
