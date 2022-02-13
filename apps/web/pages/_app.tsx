import { ApolloProvider } from '@apollo/client';
import { appWithTranslation, useTranslation } from 'next-i18next';
import { DefaultSeo } from 'next-seo';
import { ThemeProvider } from 'next-themes';
import { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import { useApollo } from '../lib/apollo';
import '../styles/global.css';

const withTerritory = (locale: string) => {
  switch (locale) {
    case 'fa':
      return 'fa_IR';
    case 'en':
      return 'en_US';
    default:
      return locale;
  }
};

function CustomApp({ Component, pageProps, router: { locale } }: AppProps) {
  const client = useApollo(pageProps.initialApolloState);
  const { t } = useTranslation();

  return (
    <ThemeProvider attribute="class">
      <DefaultSeo
        openGraph={{
          type: 'website',
          locale: withTerritory(locale),
          url: 'https://matnbaz.net/',
          site_name: t('site-name'),
          title: t('site-name'),
          images: [
            {
              url: `https://raw.githubusercontent.com/matnbaz/graphics/main/banner${
                locale === 'fa' ? '' : `-${locale}`
              }.jpg`,
              width: 1280,
              height: 640,
            },
          ],
          defaultImageWidth: 1280,
          defaultImageHeight: 640,
        }}
        titleTemplate={`%s – ${t('site-name')}`}
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

export default appWithTranslation(CustomApp);
