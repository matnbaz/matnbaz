import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';

class AppDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html dir="rtl" id="document" lang="fa">
        <Head />
        <link
          type="text/css"
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/rastikerdar/vazir-font@v30.1.0/dist/font-face.css"
        />
        <link
          href="https://cdn.rawgit.com/rastikerdar/vazir-code-font/v1.1.2/dist/font-face.css"
          rel="stylesheet"
          type="text/css"
        />
        <body className="bg-gray-50 dark:bg-gray-900">
          <div id="modal" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default AppDocument;
