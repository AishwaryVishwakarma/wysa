import {type PayloadAction, createSlice} from '@reduxjs/toolkit';

interface User {
  id: string;
  name: string;
  email: string;
  profilePicture: string;
  currentTheme: string;
  theme:
    | {
        bubbleBackgroundColor: string;
        backgroundGradient: string;
      }
    | {};
  isLogged: boolean;
}

const initialState = {
  id: '',
  name: '',
  email: '',
  profilePicture: '',
  currentTheme: 'Default',
  theme: {},
  isLogged: false,
} as User;

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    initUser: (
      state,
      action: PayloadAction<{
        id: string;
        name: string;
        email: string;
        profilePicture?: string;
        currentTheme?: string;
        theme?: {
          bubbleBackgroundColor: string;
          backgroundGradient: string;
        };
      }>
    ) => {
      const {id, name, email, profilePicture, currentTheme, theme} =
        action.payload;

      state.id = id;
      state.name = name;
      state.email = email;
      state.profilePicture = profilePicture ?? state.profilePicture;
      state.currentTheme = currentTheme ?? state.currentTheme;
      state.theme = theme ?? state.theme;
      state.isLogged = true;
    },

    updateUser: (
      state,
      action: PayloadAction<{
        profilePicture?: string;
        currentTheme?: string;
        theme?: {
          bubbleBackgroundColor: string;
          backgroundGradient: string;
        };
      }>
    ) => {
      const {profilePicture, currentTheme, theme} = action.payload;

      state.profilePicture = profilePicture ?? state.profilePicture;
      state.currentTheme = currentTheme ?? state.currentTheme;
      state.theme = theme ?? state.theme;
    },

    resetUser: (state) => {
      state.id = '';
      state.name = '';
      state.email = '';
      state.isLogged = false;
    },
  },
});

export const {initUser, updateUser, resetUser} = user.actions;

export default user.reducer;
