/* eslint-disable react/no-danger */
import React from 'react';
import { Layout } from '../components/';

export default ({ data, location }) => (
  <Layout
    title={data.markdownRemark.frontmatter.title}
    location={location}
  >
    <div
      dangerouslySetInnerHTML={{
        __html: data.markdownRemark.html,
      }}
    />
  </Layout>
);

// eslint-disable-next-line
export const pageQuery = graphql`
  query TemplateDocsMarkdown($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug }}) {
      html
      frontmatter {
        title
      }
    }
  }
`;
