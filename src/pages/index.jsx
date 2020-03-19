import Link from 'next/link';
import React from 'react';

import { Layout, useNetlifyIdentityRedirect } from '../components';

const Home = ({ posts }) => {
  useNetlifyIdentityRedirect();

  return (
    <Layout>
      <main>
        <h1>Beyond Names and Dates</h1>
        <ul>
          {posts.map(({ excerpt, publishedAt, slug, title }) => {
            return (
              <li key={slug}>
                <Link as={slug} href="/post/[slug]">
                  <a>{title}</a>
                </Link>
                <time dateTime={publishedAt}>{publishedAt}</time>
                <p>{excerpt}</p>
              </li>
            );
          })}
        </ul>
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
      .map(async entry => {
        const mdxText = fs.readFileSync(`./_content/posts/${entry.name}`);
        const { frontMatter } = await mdxToHtml(mdxText);
        const { excerpt, date, title } = frontMatter;
        const slug = `post/${entry.name.replace(/\.md$/, '')}`;

        return { excerpt, publishedAt: date.toISOString(), slug, title };
      }),
  );

  return { props: { posts } };
};

export default Home;
