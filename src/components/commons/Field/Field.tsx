import React from 'react';

import styles from './styles.module.scss';

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
  label: string;
  icon?: React.ReactNode;
  showError?: boolean;
  errorMessage?: string;
  inputRef?: React.LegacyRef<HTMLInputElement>;
}

/**
 * A reusable form field component.
 *
 * @component
 * @example
 * ```tsx
 * <Field
 *   containerClassName={styles.fieldContainer}
 *   label="Username"
 *   icon={<Icon name="user" />}
 *   showError={true}
 *   errorMessage="Invalid username"
 *   inputRef={inputRef}
 *   id="username"
 *   type="text"
 *   placeholder="Enter your username"
 *   onChange={handleChange}
 * />
 */
const Field: React.FC<FieldProps> = ({
  containerClassName = '',
  label,
  icon,
  showError = false,
  errorMessage = 'Something went wrong',
  inputRef,
  ...rest
}) => {
  const {id} = rest ?? {};

  return (
    <div className={`${styles.field} ${containerClassName}`} data-field={id}>
      <label htmlFor={id}>{label}</label>
      <span>
        <input {...rest} ref={inputRef} />
        {icon}
      </span>
      {showError && <p>{errorMessage}</p>}
    </div>
  );
};

export default Field;
