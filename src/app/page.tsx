'use client';

import {ArrowRight, Eye, EyeSlash, Login, User} from '@/assets/icons';
import {Spinner} from '@/assets/loaders';
import Layout from '@/components/Layout/Layout';
import Field from '@/components/commons/Field/Field';
import useLogin from '@/hooks/useLogin';
import React from 'react';

import styles from './styles.module.scss';

/**
 * Login page
 */
const LoginPage = () => {
  const {formData, handleChange, handleShowPassword, onSubmit, error, loading} =
    useLogin();

  return (
    <Layout className={styles.container}>
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
            showError={error.email}
            errorMessage='Please enter a valid email address'
            icon={<User aria-hidden='true' />}
          />
          <Field
            label='Password'
            id='password'
            name='password'
            required
            value={formData.password}
            onChange={handleChange}
            type={formData.showPassword ? 'text' : 'password'}
            showError={error.password}
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
          <Field
            label='Remember me'
            id='rememberMe'
            name='rememberMe'
            type='checkbox'
            checked={formData.rememberMe}
            onChange={handleChange}
            containerClassName={styles.rememberMe}
          />
          <button type='submit' disabled={loading} aria-label='Login'>
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
    </Layout>
  );
};

export default LoginPage;
