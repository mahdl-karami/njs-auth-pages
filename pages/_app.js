import "@/styles/globals.css";
import "@/styles/animations.css";
export default function App({ Component, pageProps }) {
  return (
    <div className="box">
      <Component {...pageProps} />
    </div>
  );
}
