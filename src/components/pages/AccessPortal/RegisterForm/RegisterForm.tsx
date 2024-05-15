import {Mode} from '@/app/page';
import {ArrowRight, Email, Eye, EyeSlash, User, UserPlus} from '@/assets/icons';
import {Spinner} from '@/assets/loaders';
import Field from '@/components/commons/Field/Field';
import useRegister from '@/hooks/useRegister';
import React from 'react';

import styles from './styles.module.scss';

interface Props {
  setMode: React.Dispatch<React.SetStateAction<Mode>>;
}

const RegisterForm: React.FC<Props> = ({setMode}) => {
  const {
    formData,
    handleChange,
    handleShowPassword,
    onSubmit,
    formError,
    error,
    loading,
  } = useRegister();

  return (
    <div className={styles.registerContainer}>
      <UserPlus height={35} width={35} />
      <h1>Create Account</h1>
      <form onSubmit={onSubmit} aria-label='Login form'>
        <Field
          label='Name'
          id='name'
          name='name'
          type='text'
          required
          autoComplete='name'
          value={formData.name}
          onChange={handleChange}
          showError={formError.name}
          errorMessage='Please enter a valid name'
          icon={<User aria-hidden='true' />}
        />
        <Field
          label='Email'
          id='email'
          name='email'
          type='email'
          required
          autoComplete='email'
          value={formData.email}
          onChange={handleChange}
          showError={formError.email}
          errorMessage='Please enter a valid email address'
          icon={<Email aria-hidden='true' />}
        />
        <Field
          label='Password'
          id='password'
          name='password'
          required
          value={formData.password}
          onChange={handleChange}
          type={formData.showPassword ? 'text' : 'password'}
          showError={formError.password}
          errorMessage='Password must contain at least 8 characters, including uppercase, lowercase, and numbers'
          icon={
            formData.showPassword ? (
              <EyeSlash
                onClick={handleShowPassword}
                role='button'
                aria-label='Hide password'
              />
            ) : (
              <Eye
                onClick={handleShowPassword}
                role='button'
                aria-label='Show password'
              />
            )
          }
        />
        <button
          type='button'
          className={styles.loginButton}
          onClick={() => setMode(Mode.Login)}
        >
          Already have an account? Login
        </button>
        {error && <p className={styles.error}>{error}</p>}
        <button
          className={styles.submitButton}
          type='submit'
          disabled={loading}
          aria-label='Login'
        >
          {loading ? (
            <Spinner />
          ) : (
            <>
              Register <ArrowRight aria-hidden='true' />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
