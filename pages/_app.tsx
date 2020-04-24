import React from 'react';
import { AppProps } from 'next/app';

import sentry from '../utils/sentry';
import ErrorBoundary from '../components/error-boundary';

import '../styles/style.css';

export const { Sentry, captureException } = sentry();

if (typeof window !== 'undefined') {
  console.log('%cStop!', 'font: 4em sans-serif; color: red;');
  console.log(
    '%cThis is a browser feature intended for developers. If someone told you to copy-paste something here to enable a feature or “hack” someone’s account, it is a scam and will give them access to your account.',
    'font: 1.5em sans-serif;'
  );
}

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
