import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { IntlProvider } from 'react-intl';

import 'react-simple-tree-menu/dist/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import fiMessages from 'locale/fi.json';
import enMessages from 'locale/en.json';

const messages = {
  fi: fiMessages,
  en: enMessages,
};

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  return (
    <IntlProvider locale={router.locale} messages={messages[router.locale]}>
      <Component {...pageProps} />
    </IntlProvider>
  );
};

export default App;
