import Link from 'next/link';
import React from 'react';

import { Layout } from '../../components';
import { formatDate } from '../../util';

const Post = ({ body, excerpt, publishedAt, readingTime, title }) => {
  return (
    <Layout description={excerpt} title={title}>
      <header>
        <h3>
          <Link href="/">
            <a>Beyond Names & Dates</a>
          </Link>
        </h3>
      </header>
      <main>
        <article>
          <header>
            <h1>{title}</h1>
            <p>
              <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
              {` • `}
              {`${readingTime}`}
            </p>
          </header>
          <div dangerouslySetInnerHTML={{ __html: body }} />
          <style jsx>{``}</style>
        </article>
      </main>
    </Layout>
  );
};

export const getStaticPaths = async () => {
  const fs = require('fs');

  const paths = fs
    .readdirSync('./_content/posts', { withFileTypes: true })
    .map(entry => entry.name.replace(/\.md$/, ''))
    .map(slug => ({ params: { slug } }));

  return { fallback: false, paths };
};

export const getStaticProps = async ({ params }) => {
  const fs = require('fs');
  const readingTime = require('reading-time');
  const mdxToHTML = require('../../mdx-to-html');

  // TODO: [DM] Determine the previous and next blog posts for the footer links.
  const mdxText = fs.readFileSync(`./_content/posts/${params.slug}.md`, 'utf8');
  const { frontMatter, html } = await mdxToHTML(mdxText);

  return {
    props: {
      body: html,
      excerpt: frontMatter.excerpt,
      publishedAt: frontMatter.date.toISOString(),
      readingTime: readingTime(html).text,
      title: frontMatter.title,
    },
  };
};

export default Post;
