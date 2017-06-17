/* eslint-disable react/no-danger */
/* eslint-disable react/prop-types */
import React from 'react'; // eslint-disable-line
import Helmet from 'react-helmet';

export default (props) => {
  const head = Helmet.rewind();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        {/* this.props.headComponents */}
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}
      </head>
      <body>
        <div
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  );
};
