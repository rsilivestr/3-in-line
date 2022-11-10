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
      <title>App</title>
    </Head>
    <Component {...pageProps} />
  </>
);
