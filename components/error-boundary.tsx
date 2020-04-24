import React from 'react';

import { Sentry, captureException } from '../pages/_app';

export type Props = {
  children: React.ReactNode | React.ReactNodeArray;
};

export type State = {
  hasError: boolean;
  errorEventId?: string;
};

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      hasError: false,
      errorEventId: undefined
    };
  }

  static getDerivedStateFromError() {
    // React Error Boundary here allows us to set state flagging the error (and
    // later render a fallback UI).
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    let errorEventId = captureException(error, { errorInfo });

    // Store the event id at this point as we don't have access to it within
    // `getDerivedStateFromError`.
    this.setState({ errorEventId });
  }

  handleReportClick() {
    Sentry.showReportDialog({ eventId: this.state.errorEventId });
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="w-full flex min-h-screen items-center justify-center">
          <div className="bg-gray-100 rounded p-4 shadow text-gray-700">
            <h1 className="border-b font-semibold text-lg mb-4 px-4 py-2">There was an error!</h1>
            <p className="text-center my-2">
              <a
                href="#"
                onClick={this.handleReportClick}
                className="block text-white rounded py-2 px-4 w-full bg-red-600"
              >
                📣 Report this error
              </a>
            </p>
            <p className="text-center my-2">OR</p>
            <p className="text-center my-2">
              <a
                href="#"
                onClick={() => {
                  window.location.reload(true);
                }}
                className="block text-white rounded py-2 px-4 w-full bg-blue-600"
              >
                Reload the page
              </a>
            </p>
          </div>
        </section>
      );
    } else {
      // Render the normal Next.js page
      return this.props.children;
    }
  }
}
