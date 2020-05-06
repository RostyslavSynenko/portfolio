import React, { Component } from 'react';

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
      return <div>Something bad has happened!</div>;
    }

    return children;
  }
}

export default ErrorBoundry;
