import GlobalStyle from "../styles/GlobalStyle";
import type { AppProps } from "next/app";
import Layout from "@Components/layout/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <GlobalStyle />
      <Component {...pageProps} />
    </Layout>
  );
}
