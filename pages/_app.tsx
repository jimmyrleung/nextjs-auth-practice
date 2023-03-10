import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionContextProvider } from '../src/context/SessionContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionContextProvider>
      <Component {...pageProps} />
    </SessionContextProvider>
  );
}

export default MyApp
