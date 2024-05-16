import {PATHS} from '@/helpers';
import {initUser} from '@/redux/features/userSlice';
import {useAppDispatch} from '@/redux/store';
import {useRouter} from 'next/navigation';
import React from 'react';

import {account} from '../../config/appWrite';

const useLogin = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
    showPassword: false,
  });

  const [error, setError] = React.useState<string | null>(null);

  const [loading, setLoading] = React.useState(false);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleShowPassword = () => {
    setFormData({
      ...formData,
      showPassword: !formData.showPassword,
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Prevent multiple form submissions
    if (loading) return;

    // Reset error state
    setError(null);

    const {email, password} = formData;

    setLoading(true);

    try {
      await account.createEmailPasswordSession(email, password);

      const res = await account.get();

      dispatch(
        initUser({
          id: res.$id,
          name: res.name,
          email: res.email,
          prefs: res.prefs as any,
        })
      );

      router.replace(PATHS.Home);
    } catch (error: any) {
      setError(error?.message);
      console.debug(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    handleChange,
    handleShowPassword,
    onSubmit,
    error,
    loading,
  };
};

export default useLogin;
