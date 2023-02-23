import React from 'react';
// Modules
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
// MUI
import { ServerStyleSheets } from '@material-ui/core/styles';

// Document renders only on the serverside
class MyDocument extends Document {
  // This function gets called whenever you call getInitialProps in a page
  static getInitialProps = async (ctx: DocumentContext) => {
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    // sheets.collect wraps App inside a StylesProvider and ThemeProvider
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
      });

    // This calls the getInitialProps function for a particular page
    // For example if we are on the IndexPage, IndexPage.getInitialProps(ctx) will be called here
    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      // Styles fragment is rendered after the app and register rendering finish.
      styles: [
        ...React.Children.toArray(initialProps.styles),
        sheets.getStyleElement(),
      ],
    };
  };

  render() {
    return (
      <Html>
        <Head>
          <link
            href="/images/favicon.png"
            rel="shortcut icon"
            type="image/png"
          />
        </Head>
        <body>
          {/* TODO: What do these two components do ? NextScript seems to load Javascript */}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default MyDocument;
