import { ThemeProvider, useTheme } from 'next-themes';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default CustomApp;
