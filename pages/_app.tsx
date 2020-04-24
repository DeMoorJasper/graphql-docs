import React from 'react';
import { AppProps } from 'next/app';

import sentry from '../utils/sentry';
import ErrorBoundary from '../components/error-boundary';

import '../styles/style.css';

export const { Sentry, captureException } = sentry();

export default function MyApp({ Component, pageProps }: AppProps) {
  if (Component.getInitialProps) {
    let originalGetInitialProps = Component.getInitialProps;
    Component.getInitialProps = async ctx => {
      try {
        return await originalGetInitialProps(ctx);
      } catch (error) {
        captureException(error, ctx);
      }

      // Fallback
      return {};
    };
  }

  return (
    <ErrorBoundary>
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}
