import "@/styles/globals.css";
import "@/styles/animations.css";
import Head from "next/head";
export default function App({ Component, pageProps }) {
  return (
    <div className="box">
      <Head>
        <title>Login / Signup</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Component {...pageProps} />
    </div>
  );
}
