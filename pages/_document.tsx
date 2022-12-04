import React, { ReactElement } from "react";
import Document, {
  Head,
  Html,
  Main,
  NextScript,
  DocumentInitialProps,
  DocumentContext,
} from "next/document";
import { ServerStyleSheet } from "styled-components";

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App: React.ComponentType<any>) => (props) =>
            sheet.collectStyles(<App {...props} />),
          enhanceComponent: (Component) => Component,
        });
      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [initialProps.styles, sheet.getStyleElement()],
      };
    } finally {
      sheet.seal();
    }
  }

  render(): ReactElement {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Open+Sans:wght@400;700&display=swap"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
