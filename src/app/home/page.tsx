'use client';

import Layout from '@/components/Layout/Layout';
import Chatbox from '@/components/pages/Home/Chatbox/Chatbox';
import {themeMap} from '@/helpers/theme';
import useUser from '@/hooks/useUser';
import Image from 'next/image';
import React from 'react';

import styles from './styles.module.scss';

const HomePage = () => {
  const {
    loading: userLoading,
    prefs: {currentTheme, theme: userDefinedTheme},
  } = useUser({
    fetchUser: true,
  });

  const [timoutLoading, setTimeoutLoading] = React.useState(true);

  const theme = themeMap.get(currentTheme) || userDefinedTheme;
  const loading = userLoading || timoutLoading;

  // Timeout to show loading screen for 5 seconds
  React.useEffect(() => {
    setTimeout(() => {
      setTimeoutLoading(false);
    }, 5000);
  }, []);

  return (
    <Layout
      style={{
        background: theme?.backgroundGradient,
      }}
      className={styles.container}
      showNavbar={!loading}
    >
      {loading ? (
        <div className={styles.loadingContainer}>
          <Image
            src='https://c.tenor.com/RVvnVPK-6dcAAAAd/tenor.gif'
            alt='Loading'
            width={150}
            height={150}
          />
          <p>Take a deep breath while your chat is loading</p>
        </div>
      ) : (
        <div className={styles.chatbox}>
          <Chatbox bubbleBackgoundColor={theme?.bubbleBackgroundColor} />
        </div>
      )}
    </Layout>
  );
};

export default HomePage;
