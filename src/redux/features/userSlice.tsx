import {type PayloadAction, createSlice} from '@reduxjs/toolkit';

interface User {
  id: string;
  name: string;
  email: string;
  isLogged: boolean;
}

const initialState = {
  id: '',
  name: '',
  email: '',
  isLogged: false,
} as User;

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Omit<User, 'isLogged'>>) => {
      const {id, name, email} = action.payload;

      state.id = id;
      state.name = name;
      state.email = email;
      state.isLogged = true;
    },
  },
});

export const {setUser} = user.actions;

export default user.reducer;
