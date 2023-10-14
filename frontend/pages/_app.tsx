import { useState } from 'react';
import { AppProps } from 'next/app';
import { IntlProvider } from 'react-intl';
import SSRProvider from 'react-bootstrap/SSRProvider';

import 'react-simple-tree-menu/dist/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import fiMessages from '@/locale/fi.json';

const App = ({ Component, pageProps }: AppProps) => {
  const [locale, setLocale] = useState('fi');

  return (
    <SSRProvider>
      <IntlProvider locale={locale} messages={fiMessages}>
        <Component {...pageProps} />
      </IntlProvider>
    </SSRProvider>
  );
};

export default App;
