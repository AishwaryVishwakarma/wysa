import {User} from '@/assets/icons';
import {Spinner} from '@/assets/loaders';
import {PATHS} from '@/helpers';
import {resetUser} from '@/redux/features/userSlice';
import {useAppDispatch} from '@/redux/store';
import {useRouter} from 'next/navigation';
import React from 'react';

import {account} from '../../../config/appWrite';
import Profile from '../pages/Home/Profile/Profile';
import ThemePicker from '../pages/Home/ThemePicker/ThemePicker';
import styles from './styles.module.scss';

const Navbar = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const [isProfileOpen, setIsProfileOpen] = React.useState(false);
  const [logoutLoading, setLogoutLoading] = React.useState(false);

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

  const closeProfile = () => {
    setIsProfileOpen(false);
  };

  return (
    <nav className={styles.navbar}>
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
      {isProfileOpen && <Profile closeProfile={closeProfile} />}
    </nav>
  );
};

export default Navbar;
