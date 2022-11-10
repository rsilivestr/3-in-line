import { Global } from '@emotion/react';
import Head from 'next/head';

import { Game } from 'components/Game';

export default () => (
  <>
    <Head>
      <title>Home</title>
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
    <Game />
  </>
);
