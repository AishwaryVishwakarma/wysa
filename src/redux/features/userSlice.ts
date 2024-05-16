import {type PayloadAction, createSlice} from '@reduxjs/toolkit';

interface User {
  id: string;
  name: string;
  email: string;
  prefs: {
    profilePicture: string;
    currentTheme: string;
    theme: {
      name: string;
      bubbleBackgroundColor: string;
      backgroundGradient: string;
    };
  };
  isLogged: boolean;
}

const initialState = {
  id: '',
  name: '',
  email: '',
  prefs: {
    profilePicture: '',
    currentTheme: 'Default',
    theme: {
      name: '',
      bubbleBackgroundColor: '',
      backgroundGradient: '',
    },
  },
  isLogged: false,
} as User;

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Initialize user
    initUser: (state, action: PayloadAction<Omit<User, 'isLogged'>>) => {
      const {id, name, email, prefs} = action.payload;

      state.id = id;
      state.name = name;
      state.email = email;
      state.prefs = prefs;
      state.isLogged = true;
    },

    // Update user
    updateUser: (
      state,
      action: PayloadAction<{
        profilePicture?: string;
        currentTheme?: string;
        theme?: {
          name?: string;
          bubbleBackgroundColor?: string;
          backgroundGradient?: string;
        };
      }>
    ) => {
      const {profilePicture, currentTheme, theme} = action.payload;

      state.prefs.profilePicture = profilePicture || state.prefs.profilePicture;
      state.prefs.currentTheme = currentTheme || state.prefs.currentTheme;
      state.prefs.theme = {
        ...state.prefs.theme,
        ...theme,
      };
    },

    // Reset user
    resetUser: (state) => {
      state.id = '';
      state.name = '';
      state.email = '';
      state.prefs = {
        profilePicture: '',
        currentTheme: 'Default',
        theme: {
          name: '',
          bubbleBackgroundColor: '',
          backgroundGradient: '',
        },
      };
      state.isLogged = false;
    },
  },
});

export const {initUser, updateUser, resetUser} = user.actions;

export default user.reducer;
