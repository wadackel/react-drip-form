module.exports = {
  pathPrefix: '/react-drip-form',
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'docs',
        path: `${__dirname}/../docs`,
      },
    },
    'gatsby-transformer-documentationjs',
    'gatsby-transformer-yaml',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          'gatsby-remark-autolink-headers',
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color: '#20c59d',
      },
    },
    'gatsby-plugin-catch-links',
    'gatsby-plugin-styled-components',
  ],
};
