import { mdx, MDXProvider } from '@mdx-js/react';
import Head from 'next/head';
import React from 'react';

import MDXRenderer from '../../components/MDXRenderer';

const Page = ({ body, date, title }) => {
  return (
    <MDXProvider components={{}}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          content="Beyond Names and Dates"
          key="description"
          name="description"
        />
      </Head>
      <article>
        <h1>{title}</h1>
        <time dateTime={date}>{date}</time>
        <MDXRenderer>{body}</MDXRenderer>
        <style jsx>{`
          article {
            margin: 0 auto;
            max-width: 45em;
          }
        `}</style>
      </article>
    </MDXProvider>
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
  const { attributes, body } = await import(
    `../../../_content/posts/${params.slug}.md`
  ).then(module => module.default);
  const { date, title } = attributes;
  const jsx = await mdx(body, { skipExport: true });
  const { code } = babel.transform(jsx, {
    plugins: [
      '@babel/plugin-transform-react-jsx',
      '@babel/plugin-proposal-object-rest-spread',
    ],
  });

  return { props: { body: code, date, title } };
};

export default Page;
