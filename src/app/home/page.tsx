'use client';

import {User} from '@/assets/icons';
import {Spinner} from '@/assets/loaders';
import Layout from '@/components/Layout/Layout';
import Chatbox from '@/components/pages/Home/Chatbox/Chatbox';
import Profile from '@/components/pages/Home/Profile/Profile';
import {themeMap} from '@/helpers/theme';
import useUser from '@/hooks/useUser';
import React from 'react';

import styles from './styles.module.scss';

const HomePage = () => {
  const {loading} = useUser(true);

  const [theme, setTheme] = React.useState(themeMap.get('Default'));
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);

  const closeProfile = () => {
    setIsProfileOpen(false);
  };

  return (
    <Layout
      style={{
        background: theme?.background_gradient,
      }}
      className={styles.container}
    >
      {loading ? (
        <div className={styles.spinnerContainer}>
          <Spinner className={styles.spinner} />
        </div>
      ) : (
        <>
          <p
            role='button'
            className={styles.profile}
            onClick={(): void => setIsProfileOpen(true)}
          >
            <User width={20} height={20} />
          </p>
          <div className={styles.chatbox}>
            <Chatbox bubbleBackgoundColor={theme?.bubble_background_color} />
          </div>
          {isProfileOpen && <Profile closeProfile={closeProfile} />}
        </>
      )}
    </Layout>
  );
};

export default HomePage;
