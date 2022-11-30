import type { AppProps } from 'next/app';
import Head from 'next/head';
import '@styles/globals.css';
import { useEffect, useState } from 'react';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import Layout from '@components/Layout';
import Router from 'next/router';
import { done, start, configure } from 'nprogress';
import 'nprogress/nprogress.css';

const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    configure({ showSpinner: false });

    const startLoading = () => start();
    const doneLoading = () => done();

    Router.events.on('routeChangeStart', startLoading);
    Router.events.on('routeChangeComplete', doneLoading);
    Router.events.on('routeChangeError', doneLoading);

    return () => {
      Router.events.off('routeChangeStart', startLoading);
      Router.events.off('routeChangeComplete', doneLoading);
      Router.events.off('routeChangeError', doneLoading);
    };
  });

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Frontend for a social blogging application built with Next.js and Tailwind"
        />
        <title>Raddit</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
};

export default App;
