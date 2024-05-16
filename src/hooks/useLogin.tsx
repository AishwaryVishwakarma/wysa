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

  // Form error state
  const [formError, setFormError] = React.useState({
    email: false,
    password: false,
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

  // Validate form
  const validate = () => {
    const {email, password} = formData;

    // Regular expressions for validation
    const regex = {
      email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
    };

    // Set error state
    setFormError({
      email: !regex.email.test(email),
      password: !regex.password.test(password),
    });

    // Return if there is no error
    return !formError.email && !formError.password;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Prevent multiple form submissions
    if (loading) return;

    // Reset error state
    setError(null);

    if (validate()) {
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
    }
  };

  return {
    formData,
    handleChange,
    handleShowPassword,
    onSubmit,
    formError,
    error,
    loading,
  };
};

export default useLogin;
