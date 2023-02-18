import { getDirectionality } from 'common';
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
      <Html
        dir={getDirectionality((this.props as any).locale)}
        id="document"
        lang={(this.props as any).locale}
      >
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
        {process.env.NODE_ENV === 'production' && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');`,
              }}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `(function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:${process.env.NEXT_PUBLIC_HOTJAR_ID},hjsv:${process.env.NEXT_PUBLIC_HOTJAR_SV}};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,
              }}
            />
          </>
        )}
        <body className="bg-white dark:bg-gray-900 selection:bg-primary-400 selection:text-gray-900 text-black dark:text-white overflow-x-hidden">
          <div id="modal" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default AppDocument;
