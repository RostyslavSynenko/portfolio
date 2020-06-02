import React from 'react';

import { HttpServiceConsumer } from '../HttpServiceContext';

const withHttpService = () => Wrapped => props => (
  <HttpServiceConsumer>
    {httpService => (
      <Wrapped {...props} httpService={httpService} />
    )}
  </HttpServiceConsumer>
);

export default withHttpService;
