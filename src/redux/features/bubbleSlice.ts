import {type PayloadAction, createSlice} from '@reduxjs/toolkit';

interface Chat {
  chats: {
    // type: 'image' | 'text';
    type: string;
    content: string;
  }[];
}

const initialState = {
  chats: [
    {
      type: 'image',
      content:
        'https://assets.mofoprod.net/network/images/Wysa-logo.original.jpg',
    },
    {
      type: 'text',
      content: "Hello! I'm a chatbot. How can I help you today?",
    },
    {
      type: 'text',
      content: "I'm Wysa - an AI built by therapists.",
    },
    {
      type: 'text',
      content:
        "I'm here to help you with your mental health, 24/7, anytime you need me.",
    },
  ],
} as Chat;

export const chat = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    updateChat: (state, action: PayloadAction<string>) => {
      const newState = [
        ...state.chats,
        {type: 'text', content: action.payload},
      ];
      state.chats = newState;
    },
  },
});

export const {updateChat} = chat.actions;

export default chat.reducer;
