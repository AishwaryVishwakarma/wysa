import {Cross} from '@/assets/icons';
import {Spinner} from '@/assets/loaders';
import Field from '@/components/commons/Field/Field';
import Img from 'next/image';
import React from 'react';

import {BUCKET_ID, ID, storage} from '../../../../../config/appWrite';
import styles from './styles.module.scss';
import {ProfileProps, UploadStatus} from './types';

const getStatusMessage = (status: UploadStatus) => {
  switch (status) {
    case UploadStatus.Loading:
      return <Spinner aria-label='Uploading' />;
    case UploadStatus.Success:
      return 'Uploaded Successfully';
    case UploadStatus.Error:
      return 'Failed to upload';
    default:
      return 'Upload';
  }
};

const Profile: React.FC<ProfileProps> = ({closeProfile, name, email}) => {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const [file, setFile] = React.useState<File | null>(null);
  const [image, setImage] = React.useState<string>('');
  const [status, setStatus] = React.useState<UploadStatus>(UploadStatus.Idle);

  // Handle the file change event
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      setFile(files[0]);

      // Convert the file to a blob URL
      const blob = URL.createObjectURL(files[0]);

      setImage(blob);
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!file) return;

    setStatus(UploadStatus.Loading);

    try {
      // Upload the file
      await storage.createFile(BUCKET_ID, ID.unique(), file);

      // Update the status
      setStatus(UploadStatus.Success);

      setTimeout(() => {
        setStatus(UploadStatus.Idle);
      }, 2000);
    } catch (error: any) {
      console.debug(error);
      setStatus(UploadStatus.Error);
    }
  };

  return (
    <>
      <div className={styles.overlay} onClick={closeProfile} />
      <form onSubmit={onSubmit} className={styles.container}>
        <Cross
          className={styles.closeIcon}
          height={18}
          width={18}
          onClick={closeProfile}
          role='button'
          aria-label='Close profile'
        />
        <div className={styles.profilePicture}>
          <Field
            inputRef={fileInputRef}
            label=''
            type='file'
            name='profile-picture'
            id='profile-picture'
            accept='image/*'
            onChange={handleFileChange}
          />
          {image && (
            <Img
              src={image}
              alt='Profile Picture'
              className={styles.profilePicture}
              height={100}
              width={100}
              onClick={() => fileInputRef.current?.click()}
            />
          )}
        </div>
        <p>Change Profile Picture</p>
        <div className={styles.details}>
          <Field
            containerClassName={styles.fieldContainer}
            label='Name'
            value={name}
            readOnly
          />
          <Field
            containerClassName={styles.fieldContainer}
            label='Email'
            value={email}
            readOnly
          />
        </div>
        <button type='submit'>{getStatusMessage(status)}</button>
      </form>
    </>
  );
};

export default Profile;
