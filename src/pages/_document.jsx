import Document, { Head, Html, Main, NextScript } from 'next/document';

class CustomDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);

    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en-US">
        <Head />
        <body>
          <Main />
          <NextScript />
          <style jsx global>{`
            * {
              box-sizing: border-box;
            }

            body,
            html {
              margin: 0;
              padding: 0;
            }
          `}</style>
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
