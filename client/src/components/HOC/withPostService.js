import React from 'react';

import { PostServiceConsumer } from '../PostServiceContext';

const withPostService = () => Wrapped => props => (
  <PostServiceConsumer>
    {postService => (
      <Wrapped {...props} postService={postService} />
    )}
  </PostServiceConsumer>
);

export default withPostService;
