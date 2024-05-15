import React from 'react';

import styles from './styles.module.scss';

interface ProfileProps extends React.HTMLAttributes<HTMLDivElement> {
  closeProfile: () => void;
}

const Profile: React.FC<ProfileProps> = ({
  closeProfile,
  className,
  ...rest
}) => {
  return (
    <>
      <div className={styles.overlay} onClick={closeProfile} />
      <div className={styles.container} {...rest}></div>
    </>
  );
};

export default Profile;
