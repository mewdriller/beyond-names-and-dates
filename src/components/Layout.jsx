import Head from 'next/head';
import { modularScale } from 'polished';
import React from 'react';

const Layout = ({ children, description, title }) => {
  const pageDescription = description
    ? description.trim()
    : 'Beyond Names & Dates';
  const pageTitle = [title, 'Beyond Names & Dates'].filter(Boolean).join(' | ');

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta content={pageDescription} key="description" name="description" />
      </Head>
      <div>{children}</div>
      <style jsx>{`
        div {
          margin: 0 auto;
          max-width: 45em;
          padding: ${modularScale(2)} ${modularScale(1)};
        }
      `}</style>
    </>
  );
};

export default Layout;
