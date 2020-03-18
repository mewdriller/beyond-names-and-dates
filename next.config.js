module.exports = {
  webpack: configuration => {
    configuration.module.rules.push({
      loader: 'frontmatter-markdown-loader',
      options: { mode: ['body'] },
      test: /\.md?$/,
    });

    return configuration;
  },
};
