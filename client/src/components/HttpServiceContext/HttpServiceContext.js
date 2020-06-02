import { createContext } from 'react';

const {
  Provider: HttpServiceProvider,
  Consumer: HttpServiceConsumer
} = createContext();

export { HttpServiceProvider, HttpServiceConsumer };
