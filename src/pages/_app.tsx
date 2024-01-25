import "../styles/globals.css";
import Layout from "../components/layout";
import type { AppProps } from "next/app";
import { ApiDataProvider } from "@/contexts/DataContext";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApiDataProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApiDataProvider>
  );
}
