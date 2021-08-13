/* eslint-disable jsx-a11y/html-has-lang */
import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { Helmet } from 'react-helmet';
import { ServerStyleSheet } from 'styled-components';

export default class MyDoc extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        helmet: Helmet.renderStatic(),
        styles: (
          <React.Fragment>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </React.Fragment>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  // should render on <html>
  get helmetHtmlAttrComponents() {
    return this.props.helmet.htmlAttributes.toComponent();
  }

  // should render on <body>
  get helmetBodyAttrComponents() {
    return this.props.helmet.bodyAttributes.toComponent();
  }

  // should render on <head>
  get helmetHeadComponents() {
    return Object.keys(this.props.helmet)
      .filter((el) => el !== 'htmlAttributes' && el !== 'bodyAttributes')
      .map((el) => this.props.helmet[el].toComponent());
  }

  get helmetJsx() {
    return <Helmet />;
  }

  render() {
    return (
      <Html {...this.helmetHtmlAttrComponents}>
        <Head>
          {this.helmetJsx}
          {this.helmetHeadComponents}
        </Head>

        <body {...this.helmetBodyAttrComponents}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
