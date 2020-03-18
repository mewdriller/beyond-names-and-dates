const Page = ({ attributes, html }) => {
  return (
    <article>
      <h1>{attributes.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <style jsx>{`
        article {
          margin: 0 auto;
          max-width: 45em;
        }
      `}</style>
    </article>
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
  const { attributes, html } = await import(
    `../../../_content/posts/${params.slug}.md`
  ).then(module => module.default);

  return { props: { attributes, html } };
};

export default Page;
