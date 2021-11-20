import { ApolloProvider } from '@apollo/client';
import { ThemeProvider, useTheme } from 'next-themes';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import client from '../lib/apollo';
import '../styles/global.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default CustomApp;
