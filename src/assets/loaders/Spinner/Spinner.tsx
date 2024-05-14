import React from 'react';

import styles from './styles.module.scss';

export const Spinner = ({className}: {className?: string}) => {
  return <div className={`${styles.spinner} ${className}`} />;
};
