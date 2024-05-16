import {themes} from '@/helpers/theme';
import useUser from '@/hooks/useUser';
import {updateUser} from '@/redux/features/userSlice';
import {useAppDispatch} from '@/redux/store';
import React from 'react';

import {account} from '../../../../../config/appWrite';
import styles from './styles.module.scss';

const ThemePicker = () => {
  const dispatch = useAppDispatch();

  const {prefs} = useUser();

  const onChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(updateUser({currentTheme: event.target.value}));

    try {
      await account.updatePrefs({
        ...prefs,
        currentTheme: event.target.value,
      });
    } catch (error: any) {
      console.debug(error);
    }
  };

  return (
    <select
      className={styles.themePicker}
      name='theme'
      id='theme'
      value={prefs.currentTheme}
      onChange={onChange}
    >
      {themes.map((theme) => (
        <option key={theme.name} value={theme.name}>
          {theme.name}
        </option>
      ))}
      {prefs.theme.hasOwnProperty('name') && (
        <option key={prefs.theme.name} value={prefs.theme.name}>
          {prefs.theme.name}
        </option>
      )}
    </select>
  );
};

export default ThemePicker;
