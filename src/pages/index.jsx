import React from 'react';

import { Layout, useNetlifyIdentityRedirect } from '../components';

const Home = () => {
  useNetlifyIdentityRedirect();

  return (
    <Layout>
      <main>
        <h1>Beyond Names and Dates</h1>
      </main>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const fs = require('fs');
  const mdxToHtml = require('../mdx-to-html');

  const posts = await Promise.all(
    fs
      .readdirSync('./_content/posts', { withFileTypes: true })
      .map(entry => fs.readFileSync(`./_content/posts/${entry.name}`))
      .map(mdxText => mdxToHtml(mdxText)),
  );
  const postSummaries = posts.map(({ exceprt, frontMatter, html }) => {});

  return { props: {} };
};

export default Home;
