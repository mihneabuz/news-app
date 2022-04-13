import { createSlice } from '@reduxjs/toolkit'

export const screenSlice = createSlice({
  name: 'user',
  initialState: {
    loggedIn: false,
    username: '',
    type: '',
    jwt: '',
  },
  reducers: {
    logIn: (state, args) => {
      state.loggedIn = true;
      state.jwt = args.payload; 
      console.log(state.jwt);
    },
    logOut: (state, args) => {
      state.loggedIn = false;
      state.username = '';
      state.type = '';
      state.jwt = ''; 
    }
  },
})

export const { logIn, logOut } = screenSlice.actions

export default screenSlice.reducer
