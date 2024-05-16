import {Mode} from '@/app/types';
import {ArrowRight, Email, Eye, EyeSlash, Login} from '@/assets/icons';
import {Spinner} from '@/assets/loaders';
import Field from '@/components/commons/Field/Field';
import useLogin from '@/hooks/useLogin';
import React from 'react';

import styles from './styles.module.scss';

interface Props {
  setMode: React.Dispatch<React.SetStateAction<Mode>>;
}

const LoginForm: React.FC<Props> = ({setMode}) => {
  const {formData, handleChange, handleShowPassword, onSubmit, error, loading} =
    useLogin();

  return (
    <div className={styles.loginContainer}>
      <Login height={35} width={35} />
      <h1>Welcome!</h1>
      <p>Sign in to your account</p>
      <form onSubmit={onSubmit} aria-label='Login form'>
        <Field
          label='Email'
          id='email'
          name='email'
          type='email'
          required
          value={formData.email}
          onChange={handleChange}
          icon={<Email aria-hidden='true' />}
          autoComplete='email'
        />
        <Field
          label='Password'
          id='password'
          name='password'
          required
          value={formData.password}
          onChange={handleChange}
          type={formData.showPassword ? 'text' : 'password'}
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
          autoComplete='current-password'
        />
        <button
          type='button'
          className={styles.registerButton}
          onClick={() => setMode(Mode.Register)}
        >
          Register?
        </button>
        {error && <p className={styles.error}>{error}</p>}
        <button
          type='submit'
          className={styles.loginButton}
          disabled={loading}
          aria-label='Login'
        >
          {loading ? (
            <Spinner />
          ) : (
            <>
              Login <ArrowRight aria-hidden='true' />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
