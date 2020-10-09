import '../styles/globals.css';
import * as React from 'react';
import { AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps): React.ReactNode => {
  return <Component {...pageProps} />;
};

export default App;
