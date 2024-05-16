'use client';

import {User} from '@/assets/icons';
import {Spinner} from '@/assets/loaders';
import Layout from '@/components/Layout/Layout';
import Chatbox from '@/components/pages/Home/Chatbox/Chatbox';
import Profile from '@/components/pages/Home/Profile/Profile';
import ThemePicker from '@/components/pages/Home/ThemePicker/ThemePicker';
import {PATHS} from '@/helpers';
import {themeMap} from '@/helpers/theme';
import useUser from '@/hooks/useUser';
import {resetUser} from '@/redux/features/userSlice';
import {useAppDispatch} from '@/redux/store';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import React from 'react';

import {account} from '../../../config/appWrite';
import styles from './styles.module.scss';

const HomePage = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const {
    loading: userLoading,
    prefs: {currentTheme, theme: userDefinedTheme},
  } = useUser({
    fetchUser: true,
  });

  const [isProfileOpen, setIsProfileOpen] = React.useState(false);
  const [logoutLoading, setLogoutLoading] = React.useState(false);
  const [timoutLoading, setTimeoutLoading] = React.useState(true);

  const closeProfile = () => {
    setIsProfileOpen(false);
  };

  const logOut = async () => {
    setLogoutLoading(true);

    try {
      await account.deleteSession('current');

      dispatch(resetUser());

      router.replace(PATHS.AccessPortal);
    } catch (error: any) {
      console.debug(error);
      setLogoutLoading(false);
    }
  };

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
        <>
          <div className={styles.controls}>
            <p
              role='button'
              className={styles.profile}
              onClick={(): void => setIsProfileOpen(true)}
              title='Open profile'
            >
              <User width={18} height={18} aria-hidden='true' />
            </p>
            <ThemePicker />
            <button onClick={logOut} aria-label='Logout'>
              {logoutLoading ? <Spinner /> : 'Logout'}
            </button>
          </div>
          <div className={styles.chatbox}>
            <Chatbox bubbleBackgoundColor={theme?.bubbleBackgroundColor} />
          </div>
          {isProfileOpen && <Profile closeProfile={closeProfile} />}
        </>
      )}
    </Layout>
  );
};

export default HomePage;
