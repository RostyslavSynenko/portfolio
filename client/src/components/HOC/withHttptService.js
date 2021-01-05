import React from 'react';

import { HttpServiceConsumer } from '../HttpServiceContext';

const getDisplayName = WrappedComponent =>
  WrappedComponent.displayName ||
  WrappedComponent.name ||
  'Component';

const withHttpService = () => WrappedComponent => {
  const WithHttpService = props => (
    <HttpServiceConsumer>
      {httpService => (
        <WrappedComponent
          {...props}
          httpService={httpService}
        />
      )}
    </HttpServiceConsumer>
  );

  WithHttpService.displayName = `WithHttpService(${getDisplayName(
    WrappedComponent
  )})`;

  return WithHttpService;
};

export default withHttpService;
