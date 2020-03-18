import { mdx } from '@mdx-js/react';
import React from 'react';

const MDXRenderer = ({ children, ...props }) => {
  if (!children) return null;

  const scope = { mdx };
  const fn = new Function(
    'React',
    ...Object.keys(scope),
    `${children}; return React.createElement(MDXContent)`,
  );

  return fn(React, ...Object.values(scope));
};

export default MDXRenderer;
