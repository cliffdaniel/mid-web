"use client";
import "../styles/global.css";
import { AppProps } from "next/app";
import { MainLayout } from '../layouts/MainLayout';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { AuthProvider } from '../contexts/AuthContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976D2',
    },
  },
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  const isAdminPage = Component.toString().includes('/admin/');

  return (
    <>
    <AuthProvider>
      {isAdminPage ? (
        <ThemeProvider theme={theme}>
          <MainLayout isAdmin={true}>
            <CssBaseline />
            <Component {...pageProps} />
          </MainLayout>
        </ThemeProvider>
      ) : (
        <MainLayout isAdmin={false}>
          <Component {...pageProps} />
        </MainLayout>
      )}
      </AuthProvider>
    </>
  );
};

export default MyApp;
