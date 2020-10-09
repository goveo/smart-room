import * as React from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Smart Room</h1>
        <p className={styles.description}>Smart Room Application Based on Gesture Control</p>
      </main>
    </div>
  );
};

export default Home;
