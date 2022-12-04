import type { AppProps } from "next/app";
import Head from "next/head";
import Layout from "@Components/layout/Layout";
import GlobalStyle from "../styles/GlobalStyle";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <GlobalStyle />
      <Component {...pageProps} />
    </Layout>
  );
}
