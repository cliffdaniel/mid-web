import "../styles/global.css";
import { AppProps } from "next/app";
import { MainLayout } from '../layouts/MainLayout';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </>
  );
};

export default MyApp;
