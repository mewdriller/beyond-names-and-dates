import Head from 'next/head';
import React from 'react';

const Layout = ({ children, description, title }) => {
  const pageDescription = description
    ? description.trim()
    : 'Beyond Names and Dates';
  const pageTitle = [title, 'Beyond Names and Dates']
    .filter(Boolean)
    .join(' | ');

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta content={pageDescription} key="description" name="description" />
      </Head>
      {children}
    </>
  );
};

export default Layout;
