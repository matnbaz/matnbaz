import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from 'next-themes';
import { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import { useApollo } from '../lib/apollo';
import '../styles/global.css';

function CustomApp({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps.initialApolloState);
  return (
    <ThemeProvider attribute="class">
      <ApolloProvider client={client}>
        <NextNProgress options={{ showSpinner: false }} height={2} />
        <Component {...pageProps} />
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default CustomApp;
