const babel = require('@babel/core');
const mdx = require('@mdx-js/mdx');
const { MDXProvider, mdx: createElement } = require('@mdx-js/react');
const matter = require('gray-matter');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');

const components = {};

const mdxToHTML = async mdxText => {
  // TODO: [DM] Turn on excerpt support.
  const { content, data: frontMatter } = matter(mdxText);
  const jsx = await mdx(content, { skipExport: true });
  const { code } = babel.transform(jsx, {
    plugins: [
      '@babel/plugin-transform-react-jsx',
      '@babel/plugin-proposal-object-rest-spread',
    ],
  });
  const scope = { mdx: createElement };
  const fn = new Function(
    'React',
    ...Object.keys(scope),
    `${code}; return React.createElement(MDXContent)`,
  );
  const element = React.createElement(
    MDXProvider,
    { components },
    fn(React, ...Object.values(scope)),
  );
  const html = renderToStaticMarkup(element);

  return { excerpt: '', frontMatter, html };
};

module.exports = mdxToHTML;
