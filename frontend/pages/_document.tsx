import { Html, Head, Main, NextScript } from 'next/document';

import StyledComponentsRegistry from '../utils/styledRegistry';

const Document = () => (
  <Html>
    <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Rajdhani&display=swap"
        rel="stylesheet"
      />
    </Head>
    <body>
      <StyledComponentsRegistry>
        <Main />
        <NextScript />
      </StyledComponentsRegistry>
    </body>
  </Html>
);

export default Document;
