// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

// ./pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';
import xw from 'xwind';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <link rel="stylesheet" as="style" href="https://rsms.me/inter/inter.css" />
        <body css={xw`bg-white text-black dark:bg-gray-900 dark:text-white duration-500`}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
