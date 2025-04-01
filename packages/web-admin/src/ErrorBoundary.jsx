﻿import React from 'react';
import PropTypes from 'prop-types';
import ErrorPage from './Components/ErrorPage';

class ErrorBoundary extends React.Component {
  // @ts-ignore
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  // @ts-ignore
  static getDerivedStateFromError(error) {
    console.log(error);
    return { hasError: true };
  }

  // @ts-ignore
  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service
    console.error('Error caught in ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI
      return <ErrorPage />;
    }

    return this.props.children;
  }
}

// Add PropTypes for validation
ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired
};

export default ErrorBoundary;
