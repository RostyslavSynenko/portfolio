import React, { Component } from 'react';

import ErrorIndicator from './ErrorIndicator';

class ErrorBoundry extends Component {
  state = {
    isError: false
  };

  componentDidCatch() {
    this.setState({ isError: true });
  }

  render() {
    const { isError } = this.state;
    const { children } = this.props;

    if (isError) {
      return <ErrorIndicator />;
    }

    return children;
  }
}

export default ErrorBoundry;
