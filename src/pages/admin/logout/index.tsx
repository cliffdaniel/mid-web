import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../../contexts/AuthContext';

const LogoutPage: React.FC = () => {
  const { logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem('username');
    logout();
    router.push('/');
  }, []);

  return <div>Realizando logout...</div>;
};

export default LogoutPage;
