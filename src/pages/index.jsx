import Link from 'next/link';
import { modularScale } from 'polished';
import React from 'react';

import { Layout, useNetlifyIdentityRedirect } from '../components';
import { formatDate } from '../util';

const Bio = () => {
  return (
    <aside>
      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==" />
      <p>Personal blog by Laura Miller</p>
      <style jsx>{`
        aside {
          display: flex;
          margin-bottom: ${modularScale(4)};
        }

        img {
          border-radius: 50%;
          height: ${modularScale(4)};
          margin-right: ${modularScale(0.5)};
          width: ${modularScale(4)};
        }
      `}</style>
    </aside>
  );
};

const PostSummary = ({ excerpt, publishedAt, readingTime, slug, title }) => {
  return (
    <article>
      <header>
        <h3>
          <Link as={slug} href="/post/[slug]">
            <a rel="bookmark">{title}</a>
          </Link>
        </h3>
      </header>
      <small>
        <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
        {` • `}
        {`${readingTime}`}
      </small>
      <p>{excerpt}</p>
      <style jsx>{``}</style>
    </article>
  );
};

const Home = ({ posts }) => {
  useNetlifyIdentityRedirect();

  return (
    <Layout>
      <header>
        <h1>Beyond Names & Dates</h1>
      </header>
      <Bio />
      <main>
        {posts.map(post => (
          <PostSummary {...post} key={post.slug} />
        ))}
      </main>
      <footer>
        <a href="https://twitter.com">twitter</a>
        {` • `}
        <a href="https://twitter.com">youtube</a>
      </footer>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const fs = require('fs');
  const readingTime = require('reading-time');
  const mdxToHtml = require('../mdx-to-html');

  const posts = await Promise.all(
    fs
      .readdirSync('./_content/posts', { withFileTypes: true })
      .map(async entry => {
        const mdxText = fs.readFileSync(`./_content/posts/${entry.name}`);
        const { frontMatter, html } = await mdxToHtml(mdxText);
        const { excerpt, date, title } = frontMatter;
        const slug = `post/${entry.name.replace(/\.md$/, '')}`;

        return {
          excerpt,
          publishedAt: date.toISOString(),
          readingTime: readingTime(html).text,
          slug,
          title,
        };
      }),
  );

  return { props: { posts } };
};

export default Home;
