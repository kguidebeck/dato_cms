import React from 'react';
import { Helmet } from 'react-helmet';
import { useRouter } from 'next/router';
import GlobalStyle from 'styles/global-style';
import TabFocusOutlineStyles from 'components/TabFocusOutlineStyles';

const MyApp = ({ Component, pageProps }) => {
  const { asPath } = useRouter();

  return (
    <>
      <Helmet
        htmlAttributes={{ lang: 'en' }}
        defaultTitle="Next.js Starter"
        titleTemplate="%s | Next.js Starter"
        meta={[
          { charset: 'UTF-8' },
          process.env.NO_INDEX === 'true'
            ? { name: 'robots', content: 'noindex' }
            : false,
        ].filter(Boolean)}
      />
      <Component key={asPath} {...pageProps} />
      <GlobalStyle />
      <TabFocusOutlineStyles />
    </>
  );
};

export default MyApp;
