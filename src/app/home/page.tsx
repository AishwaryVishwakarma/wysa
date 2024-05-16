'use client';

import {User} from '@/assets/icons';
import {Spinner} from '@/assets/loaders';
import Layout from '@/components/Layout/Layout';
import Chatbox from '@/components/pages/Home/Chatbox/Chatbox';
import Profile from '@/components/pages/Home/Profile/Profile';
import {PATHS} from '@/helpers';
import {themeMap} from '@/helpers/theme';
import useUser from '@/hooks/useUser';
import {resetUser} from '@/redux/features/userSlice';
import {useAppDispatch} from '@/redux/store';
import {useRouter} from 'next/navigation';
import React from 'react';

import {account} from '../../../config/appWrite';
import styles from './styles.module.scss';

const HomePage = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const {loading} = useUser({
    fetchUser: true,
  });

  const [theme, setTheme] = React.useState(themeMap.get('Default'));
  const [isProfileOpen, setIsProfileOpen] = React.useState(true);
  const [logoutLoading, setLogoutLoading] = React.useState(false);

  const closeProfile = () => {
    setIsProfileOpen(false);
  };

  const logOut = async () => {
    setLogoutLoading(true);

    try {
      await account.deleteSession('current');
    } catch (error: any) {
      console.debug(error);
      setLogoutLoading(false);
      return;
    }

    dispatch(resetUser());

    router.replace(PATHS.AccessPortal);
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
          <div className={styles.controls}>
            <p
              role='button'
              className={styles.profile}
              onClick={(): void => setIsProfileOpen(true)}
              title='Open profile'
            >
              <User width={18} height={18} aria-hidden='true' />
            </p>
            <button onClick={logOut} aria-label='Logout'>
              {logoutLoading ? <Spinner /> : 'Logout'}
            </button>
          </div>
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
