import dwolla, { DocumentUpload } from "@dwolla/dwolla-react";
import Head from "next/head";
import styles from "../styles.module.css";

dwolla.configure({
  environment: "sandbox",
  fetchToken: () => Promise.resolve("MY_TOKEN"),
});

export default function MyPage() {
  return (
    <div>
      <Head>
        <title>My styled page</title>
        <link href="/styles.css" rel="stylesheet" />
      </Head>
      <div className={styles.container}>
        <DocumentUpload />
      </div>
    </div>
  );
}
