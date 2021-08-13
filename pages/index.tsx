import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { CatPost } from "./types/Cats";
import { NextPage } from "next";
import { useState } from "react";
import CatCard from "./CatCard";
import { Row, Col } from "antd";
import Link from "next/link";

interface HomeProps {
  posts: CatPost[];
}

const Home: NextPage<HomeProps> = ({ posts }) => {
  const [selectedPosts, setSelectedPosts] = useState(posts);
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Row justify="center">
          {selectedPosts.map(({ author, title, url }, index) => (
            <Col key={index}>
              <CatCard key={index} author={author} title={title} url={url} />
            </Col>
          ))}
        </Row>
      </main>
      <footer className={styles.footer}>

        <Link href="/stat"> Stat page </Link>

        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

Home.getInitialProps = async ({ req }) : Promise<HomeProps> => {
  let host = "";
  if (req != undefined) {
    const {
      headers: { host: hostHeader },
    } = req;
    host = hostHeader;
  } else {
    host = "localhost:3000";
  }
  const res = await fetch(`http://${host}/api/getCats`);
  return { posts: await res.json() };
};

export default Home;
