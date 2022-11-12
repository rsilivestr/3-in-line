import { Global } from '@emotion/react';
import { AppProps } from 'next/app';
import Head from 'next/head';

export default ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta name="description" content="" />
      <meta name="keywords" content="" />
      <meta name="theme-color" content="#fff" />
    </Head>
    <Global
      styles={{
        '*': {
          boxSizing: 'border-box',
          margin: 0,
          padding: 0,
        },
        body: {
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
      }}
    />
    <Component {...pageProps} />
  </>
);
