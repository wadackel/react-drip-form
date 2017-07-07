const _ = require('lodash');
const path = require('path');
const parseFilepath = require('parse-filepath');
const slash = require('slash');


exports.modifyWebpackConfig = ({ config }) => {
  config.merge({
    resolve: {
      alias: {
        'react-drip-form': path.resolve(__dirname, '../src/'),
      },
    },
  });

  return config;
};


exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;

  return new Promise((resolve, reject) => {
    const docsTemplate = path.resolve('src/templates/template-docs-markdown.js');

    resolve(
      graphql(`
      {
        allMarkdownRemark(limit: 1000) {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
      `).then((result) => {
        if (result.errors) {
          reject(result.errors);
        }

        // Create docs pages.
        result.data.allMarkdownRemark.edges.forEach((edge) => {
          const slug = _.get(edge, 'node.fields.slug');
          if (!slug) return;

          createPage({
            path: `${edge.node.fields.slug}`, // required
            component: slash(docsTemplate),
            context: {
              slug: edge.node.fields.slug,
            },
          });
        });
      })
    );
  });
};


exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators;
  let slug;

  if (node.internal.type === 'File') {
    const parsedFilePath = parseFilepath(node.relativePath);
    const slugs = ['docs'];

    if (node.sourceInstanceName === 'docs') {
      if (parsedFilePath.name === 'README') {
        slugs.push(parsedFilePath.dir);
      } else {
        if (parsedFilePath.dir !== '') {
          slugs.push(parsedFilePath.dir);
        }
        if (parsedFilePath.name !== '') {
          slugs.push(parsedFilePath.name);
        }
      }
    }

    slug = `${slugs.filter(v => !!v).join('/')}/`;
    if (slug && slug !== '/') {
      createNodeField({ node, name: 'slug', value: slug });
    }
  } else if (
    node.internal.type === 'MarkdownRemark' &&
      getNode(node.parent).internal.type === 'File'
  ) {
    const fileNode = getNode(node.parent);
    const parsedFilePath = parseFilepath(fileNode.relativePath);
    const slugs = ['docs'];

    if (fileNode.sourceInstanceName === 'docs') {
      if (parsedFilePath.name === 'README') {
        slugs.push(parsedFilePath.dir);
      } else {
        if (parsedFilePath.dir !== '') {
          slugs.push(parsedFilePath.dir);
        }
        if (parsedFilePath.name !== '') {
          slugs.push(parsedFilePath.name);
        }
      }
      slug = `${slugs.filter(v => !!v).join('/')}/`;
      if (slug && slug !== '/') {
        createNodeField({ node, name: 'slug', value: slug });
      }
    }
  }
};
