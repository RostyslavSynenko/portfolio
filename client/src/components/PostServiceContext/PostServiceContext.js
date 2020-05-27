import { createContext } from 'react';

const {
  Provider: PostServiceProvider,
  Consumer: PostServiceConsumer
} = createContext();

export { PostServiceProvider, PostServiceConsumer };
