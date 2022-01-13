import { ApolloProvider } from '@apollo/client';
import { DefaultSeo } from 'next-seo';
import { ThemeProvider } from 'next-themes';
import { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import { useApollo } from '../lib/apollo';
import '../styles/global.css';

function CustomApp({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps.initialApolloState);
  return (
    <ThemeProvider attribute="class">
      <DefaultSeo
        openGraph={{
          type: 'website',
          locale: 'fa_IR',
          url: 'https://matnbaz.net/',
          site_name: 'متن‌باز',
          title: 'متن‌باز',
          images: [
            { url: 'https://matnbaz.net/banner.jpg', width: 1280, height: 640 },
          ],
          defaultImageWidth: 1280,
          defaultImageHeight: 640,
        }}
        titleTemplate={'%s – متن‌باز'}
        twitter={{
          handle: '@alitnk_',
          site: '@matnbaz_net',
          cardType: 'summary_large_image',
        }}
      />
      <ApolloProvider client={client}>
        <NextNProgress
          options={{ showSpinner: false }}
          height={2}
          color="#1E90FF"
        />
        <Component {...pageProps} />
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default CustomApp;
