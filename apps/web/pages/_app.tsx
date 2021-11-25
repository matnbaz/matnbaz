import { ApolloProvider } from '@apollo/client';
import { ThemeProvider, useTheme } from 'next-themes';
import { AppProps } from 'next/app';
import { useApollo } from '../lib/apollo';

import '../styles/global.css';

function CustomApp({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps.initialApolloState);
  return (
    <ThemeProvider attribute="class">
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default CustomApp;
