import { useState } from 'react';
import { AppProps } from 'next/app';
import { IntlProvider } from 'react-intl';

import fiMessages from '@/locale/fi.json';

const App = ({ Component, pageProps }: AppProps) => {
  const [locale, setLocale] = useState('fi');

  return (
    <IntlProvider locale={locale} messages={fiMessages}>
      <Component {...pageProps} />
    </IntlProvider>
  );
};

export default App;
