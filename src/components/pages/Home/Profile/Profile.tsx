import {Cross, Information} from '@/assets/icons';
import {Spinner} from '@/assets/loaders';
import Field from '@/components/commons/Field/Field';
import {backgroundGradients, bubbleBackgroundColors} from '@/helpers/theme';
import useUser from '@/hooks/useUser';
import {updateUser} from '@/redux/features/userSlice';
import {useAppDispatch} from '@/redux/store';
import Img from 'next/image';
import React from 'react';

import {
  BUCKET_ID,
  ID,
  PROJECT_ID,
  account,
  storage,
} from '../../../../../config/appWrite';
import styles from './styles.module.scss';
import {ProfileProps, UploadStatus} from './types';

const getStatusMessage = (status: UploadStatus) => {
  switch (status) {
    case UploadStatus.Loading:
      return <Spinner aria-label='Updating...' />;
    case UploadStatus.Success:
      return 'Updated Successfully';
    case UploadStatus.Error:
      return 'Failed to Update';
    default:
      return 'Update';
  }
};

const Profile: React.FC<ProfileProps> = ({closeProfile}) => {
  const dispatch = useAppDispatch();

  const {name, email, prefs} = useUser();

  const {profilePicture, theme: userTheme} = prefs;

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const [file, setFile] = React.useState<File | null>(null);
  const [image, setImage] = React.useState<string>(profilePicture);
  const [theme, setTheme] = React.useState({
    name: userTheme.name || '',
    bubbleBackgroundColor:
      userTheme?.bubbleBackgroundColor || bubbleBackgroundColors[0],
    backgroundGradient: userTheme?.backgroundGradient || backgroundGradients[0],
  });
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

  const handleThemeChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const {name, value} = event.target;

    setTheme({
      ...theme,
      [name]: value,
    });
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setStatus(UploadStatus.Loading);

    try {
      let imageUrl = profilePicture;

      if (file) {
        // Upload the file
        const res = await storage.createFile(BUCKET_ID, ID.unique(), file);

        imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${BUCKET_ID}/files/${res.$id}/view?project=${PROJECT_ID}&mode=admin`;
      }

      // Update the user
      await account.updatePrefs({
        ...prefs,
        profilePicture: imageUrl,
        theme: {
          ...theme,
          name: theme.name || 'Custom Theme',
        },
      });

      // Update the user in the store
      dispatch(
        updateUser({
          profilePicture: imageUrl,
          theme: {
            ...theme,
            name: theme.name || 'Custom Theme',
          },
        })
      );

      if (!theme.name) {
        setTheme({
          ...theme,
          name: 'Custom Theme',
        });
      }

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
            containerClassName={`${styles.fieldContainer} ${styles.disabled}`}
            label='Name'
            value={name}
            readOnly
            disabled
          />
          <Field
            containerClassName={`${styles.fieldContainer} ${styles.disabled}`}
            label='Email'
            value={email}
            readOnly
            disabled
          />
        </div>
        <div className={styles.themeDetails}>
          <Field
            containerClassName={styles.fieldContainer}
            type='text'
            label='Theme Name'
            id='theme-name'
            value={theme.name}
            name='name'
            onChange={handleThemeChange}
            placeholder='Please enter a theme name'
            icon={
              <span title='Please enter your custom theme name'>
                <Information aria-hidden='true' />
              </span>
            }
          />
          <div className={styles.dropdown}>
            <label htmlFor='bubble-background'>Bubble Background</label>
            <select
              name='bubbleBackgroundColor'
              id='bubble-background'
              onChange={handleThemeChange}
              value={theme.bubbleBackgroundColor}
              style={{background: theme.bubbleBackgroundColor}}
              title='Select a bubble background color'
            >
              {bubbleBackgroundColors.map((color) => (
                <option
                  key={color}
                  value={color}
                  style={{backgroundColor: color}}
                />
              ))}
            </select>
          </div>
          <div className={styles.dropdown}>
            <label htmlFor='background-gradient'>Background</label>
            <select
              name='backgroundGradient'
              id='background-gradient'
              onChange={handleThemeChange}
              value={theme.backgroundGradient}
              style={{background: theme.backgroundGradient}}
              title='Select a background gradient'
            >
              {backgroundGradients.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          type='submit'
          className={styles.submitButton}
          disabled={status === UploadStatus.Loading}
          aria-label='Update'
        >
          {getStatusMessage(status)}
        </button>
      </form>
    </>
  );
};

export default Profile;
