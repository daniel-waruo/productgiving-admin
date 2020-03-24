// IMPORT MD-BOOTSTRAP CSS
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../assets/css/mdb-pro.css';
import '../assets/css/dist/style.css';
import React from 'react';
import Head from 'next/head';
import {DefaultSeo} from 'next-seo';

// This default export is required in a new `pages/_app.js` file.
function App({Component, pageProps}) {

  return (
    <>
      <Head>
        <link rel="shortcut icon" href={"/favicon.ico"}/>
        <title>Voting Website</title>
      </Head>
      <DefaultSeo
        title={""}
        titleTemplate={" %s | Voting Website"}
        description={
          "Voting System"
        }
      />
      <Component {...pageProps} />
    </>
  )
}

export default App