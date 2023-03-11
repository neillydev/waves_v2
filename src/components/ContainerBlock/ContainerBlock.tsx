import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import styles from '../../styles/main.module.css';
import Navbar from "../Navbar/Navbar";

export default function ContainerBlock({ children, ...customMeta }: any) {
  const router = useRouter();

  const meta = {
    title: "Waves - Surf Trends",
    description: ``,
    image: "/avatar.png",
    type: "website",
    ...customMeta,
  };
  return (
    <div>
      <Head>
        <title>{meta.title}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
        </style>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta
          property="og:url"
          content={`https://neilly.dev${router.asPath}`}
        />
        <link
          rel="canonical"
          href={`https://neilly.dev${router.asPath}`}
        />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Waves" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@waves" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        {meta.date && (
          <meta property="article:published_time" content={meta.date} />
        )}
      </Head>
      <div className={styles.containerBlock}>
        <Navbar />

        <main className={styles.mainContainer}>
          {children}
        </main>
      </div>
    </div>
  );
}