import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <title>Tandem String - Precision In Every Pixel</title>
        <meta content="Tandem String" name="description" />
        <meta content="Tandem String" property="og:title" />
        <meta content="Tandem String" property="og:description" />
        <meta content="/images/logo.svg" property="og:image" />
        <meta content="Tandem String" property="twitter:title" />
        <meta content="Tandem String" property="twitter:description" />
        <meta content="/images/favicon.png" property="twitter:image" />
        <meta property="og:type" content="website" />
        <meta content="summary_large_image" name="twitter:card" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link
          href="/images/favicon.ico"
          rel="shortcut icon"
          type="image/x-icon"
        />
        <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
