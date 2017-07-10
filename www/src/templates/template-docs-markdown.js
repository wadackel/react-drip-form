/* eslint-disable react/no-danger */
import React from 'react';
import { Layout } from '../components/';


export default ({ data, location }) => {
  const { frontmatter, html: __html } = data.markdownRemark;

  return (
    <Layout
      title={frontmatter.title}
      location={location}
      previous={frontmatter.previous}
      next={frontmatter.next}
    >
      <div
        dangerouslySetInnerHTML={{
          __html,
        }}
      />
    </Layout>
  );
};

// eslint-disable-next-line
export const pageQuery = graphql`
  query TemplateDocsMarkdown($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug }}) {
      html
      frontmatter {
        title
        previous {
          link
          title
        }
        next {
          link
          title
        }
      }
    }
  }
`;
