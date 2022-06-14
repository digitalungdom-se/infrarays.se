import "styles/globals.css";
import type { AppProps } from "next/app";
import App from "App";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <App>
      <Component {...pageProps} />
    </App>
  );
}

export default MyApp;
