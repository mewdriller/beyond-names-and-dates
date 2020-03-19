import React from 'react';

import { Layout } from '../../components';

const Post = ({ body, excerpt, publishedAt, title }) => {
  return (
    <Layout description={excerpt} title={title}>
      <article>
        <h1>{title}</h1>
        <time dateTime={publishedAt}>{publishedAt}</time>
        <div dangerouslySetInnerHTML={{ __html: body }} />
        <style jsx>{`
          article {
            margin: 0 auto;
            max-width: 45em;
          }
        `}</style>
      </article>
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
  const mdxToHTML = require('../../mdx-to-html');

  const mdxText = fs.readFileSync(`./_content/posts/${params.slug}.md`, 'utf8');
  const { frontMatter, html } = await mdxToHTML(mdxText);

  return {
    props: {
      body: html,
      excerpt: frontMatter.excerpt,
      publishedAt: frontMatter.date.toISOString(),
      title: frontMatter.title,
    },
  };
};

export default Post;
