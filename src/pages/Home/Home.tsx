import React from 'react';
import styles from './Home.module.css';
import { HandDetector } from '../../components/HandDetector';

export const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Smart Room</h1>
        <HandDetector></HandDetector>
        <p className={styles.description}>Smart Room Application Based on Gesture Control</p>
      </main>
    </div>
  );
};
export default Home;
