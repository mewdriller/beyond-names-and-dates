import Head from "next/head";
import { useEffect } from "react";

const useNetlifyIdentityRedirect = () => {
  useEffect(() => {
    const locationHash = document.location.hash?.replace(/^#\/?/, "");

    if (
      locationHash &&
      [
        /(confirmation|invite|recovery|email_change)_token=([^&]+)/,
        /error=access_denied&error_description=403/,
        /access_token=/
      ].some(regex => regex.test(locationHash))
    ) {
      import("netlify-identity-widget").then(
        ({ default: netlifyIdentityWidget }) => {
          netlifyIdentityWidget.on("init", user => {
            if (!user) {
              netlifyIdentityWidget.on("login", () => {
                document.location.href = "/admin/";
              });
            }
          });

          netlifyIdentityWidget.init();
        }
      );
    }
  }, []);
};

const Home = () => {
  useNetlifyIdentityRedirect();

  return (
    <div>
      <Head>
        <title>Beyond Names and Dates</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          content="Beyond Names and Dates"
          key="description"
          name="description"
        />
      </Head>
      <main>
        <h1>Beyond Names and Dates</h1>
      </main>
    </div>
  );
};

export default Home;
