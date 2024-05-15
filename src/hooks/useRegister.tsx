import {PATHS} from '@/helpers';
import {setUser} from '@/redux/features/userSlice';
import {useAppDispatch} from '@/redux/store';
import {useRouter} from 'next/navigation';
import React from 'react';

import {ID, account} from '../../config/appWrite';

const useRegister = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
    showPassword: false,
  });

  // Form error state
  const [formError, setFormError] = React.useState({
    name: false,
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
    const {name, email, password} = formData;

    // Regular expressions for validation
    const regex = {
      name: /^[a-zA-Z\s]+$/,
      email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
    };

    // Set formError
    setFormError({
      name: !regex.name.test(name),
      email: !regex.email.test(email),
      password: !regex.password.test(password),
    });

    // Return if there is no formError
    return !formError.name && !formError.email && !formError.password;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Prevent multiple form submissions
    if (loading) return;

    setError(null);

    // Validate form
    if (validate()) {
      const {name, email, password} = formData;

      setLoading(true);

      try {
        const id = ID.unique();

        await account.create(id, email, password, name);

        // Set user in redux store
        dispatch(setUser({id, name, email}));

        await account.createEmailPasswordSession(email, password);

        // Redirect to home page
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

export default useRegister;
