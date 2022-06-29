import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [numOfWhitelisted, setNumOfWhitelisted] = useState(0);

  return (
    <div className={styles.container}>
      <Head>
        <title>Whitelist Dapp</title>
        <meta name="description" content="Whitelist Dapp" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Crypto Deves</h1>
        <div className={styles.description}>
          {numOfWhitelisted} already joined the whitelist
        </div>

        <img className={styles.image} src="./crypto-devs.svg" />
      </main>

      <footer className={styles.footer}>Made with &#10084; Crypto Devs</footer>
    </div>
  );
}
