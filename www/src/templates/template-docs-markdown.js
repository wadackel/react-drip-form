/* eslint-disable react/no-danger */
/* eslint-disable react/prop-types */
import React from 'react'; // eslint-disable-line

export default ({ data }) => (
  <div>
    <h1>{data.markdownRemark.frontmatter.title}</h1>
    <div
      dangerouslySetInnerHTML={{
        __html: data.markdownRemark.html,
      }}
    />
    <pre>
      <code>{JSON.stringify(data, null, 2)}</code>
    </pre>
  </div>
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
