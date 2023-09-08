import React, { ReactNode } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

type MainLayoutProps = {
  children: ReactNode;
  isAdmin: boolean;
};

export const MainLayout: React.FC<MainLayoutProps> = ({ children, isAdmin }) => {
  return (
    <div className="flex flex-col min-h-screen mx-auto max-w-[1440px] px-0 md:px-[60px]">
      <Header isAdmin={isAdmin} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};
