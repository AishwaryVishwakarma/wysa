'use client';

import {Spinner} from '@/assets/loaders';
import Layout from '@/components/Layout/Layout';
import LoginForm from '@/components/pages/AccessPortal/LoginForm/LoginForm';
import RegisterForm from '@/components/pages/AccessPortal/RegisterForm/RegisterForm';
import {PATHS} from '@/helpers';
import useUser from '@/hooks/useUser';
import {setUser} from '@/redux/features/userSlice';
import {useAppDispatch} from '@/redux/store';
import {useRouter} from 'next/navigation';
import React from 'react';

import {account} from '../../config/appWrite';
import styles from './styles.module.scss';

export enum Mode {
  Login = 'login',
  Register = 'register',
}

/**
 * Login page
 */
const AccessPortalPage = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const {isLogged, getUser, loading: userLoading} = useUser();

  const [mode, setMode] = React.useState(Mode.Login);
  const [loading, setLoading] = React.useState(userLoading);

  const pageLoading = userLoading || loading;

  React.useEffect(() => {
    if (isLogged) {
      router.replace(PATHS.Home);
      return;
    }

    getUser(
      () => {
        router.replace(PATHS.Home);
      },
      () => {
        setLoading(false);
      }
    );
  }, [dispatch, router, isLogged, getUser]);

  return (
    <Layout className={styles.container}>
      {pageLoading ? (
        <Spinner className={styles.spinner} />
      ) : mode === Mode.Login ? (
        <LoginForm setMode={setMode} />
      ) : (
        <RegisterForm setMode={setMode} />
      )}
    </Layout>
  );
};

export default AccessPortalPage;
