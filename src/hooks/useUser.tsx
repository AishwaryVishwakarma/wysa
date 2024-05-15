import {PATHS} from '@/helpers';
import {setUser} from '@/redux/features/userSlice';
import {useAppDispatch, useAppSelector} from '@/redux/store';
import {useRouter} from 'next/navigation';
import React from 'react';

import {account} from '../../config/appWrite';

const useUser = (fetchUser = false) => {
  const router = useRouter();

  const user = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  const [loading, setLoading] = React.useState(!user.isLogged);

  const getUser = React.useCallback(
    async (
      onSucess?: () => void,
      onError?: () => void,
      navigateToAccessPortal = true
    ) => {
      try {
        // Get user from appwrite
        const res = await account.get();

        // Call onSucess callback if provided
        onSucess?.();

        // Set user in redux store
        dispatch(
          setUser({
            id: res.$id,
            email: res.email,
            name: res.name,
          })
        );

        setLoading(false);
      } catch (error: any) {
        console.debug(error);

        // Call onError callback if provided
        onError?.();

        if (navigateToAccessPortal) {
          router.replace(PATHS.AccessPortal);
          return;
        }

        setLoading(false);
      }
    },
    [dispatch, router]
  );

  // Fetch user on mount if fetchUser is true
  React.useEffect(() => {
    if (user.isLogged || !fetchUser) return;

    getUser();
  }, [user.isLogged, fetchUser, getUser]);

  return {
    ...user,
    getUser,
    loading,
  };
};

export default useUser;
