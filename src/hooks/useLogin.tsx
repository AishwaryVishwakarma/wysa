import React from 'react';

const useLogin = () => {
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
    rememberMe: false,
    showPassword: false,
  });

  const [error, setError] = React.useState({
    email: false,
    password: false,
  });

  const [loading, setLoading] = React.useState(false);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value, type, checked} = e.target;

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
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
    setError({
      email: !regex.email.test(email),
      password: !regex.password.test(password),
    });

    // Return if there is no error
    return !error.email && !error.password;
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Prevent multiple form submissions
    if (loading) return;

    if (validate()) {
      setLoading(true);
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
