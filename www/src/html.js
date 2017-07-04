/* eslint-disable global-require */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-webpack-loader-syntax */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/no-danger */
import React from 'react';
import Helmet from 'react-helmet';
import flush from 'styled-jsx/server';
import GitHubCorner from './components/GitHubCorner';

export default (props) => {
  const head = Helmet.rewind();
  const styles = flush();

  let css;
  if (process.env.NODE_ENV === 'production') {
    css = (
      <style
        dangerouslySetInnerHTML={{
          __html: require('!raw!../public/styles.css'),
        }}
      />
    );
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://fonts.googleapis.com/css?family=Poppins:500,700" rel="stylesheet" />
        <link href={require('!file-loader!../static/favicon.ico')} rel="shortcut icon" />
        <link href={require('!file-loader!../static/apple-touch-icon.png')} rel="apple-touch-icon" sizes="152x152" />
        {props.headComponents}
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}
        {styles}
        {css}
      </head>
      <body>
        <GitHubCorner />
        <div
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  );
};
