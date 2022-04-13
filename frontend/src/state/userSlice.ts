import { createSlice } from '@reduxjs/toolkit'
import jwtDecode from 'jwt-decode';

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
      const payload: any = jwtDecode(state.jwt);
      state.username = payload.username;
      state.type = payload.type;
    },
    logOut: (state) => {
      state.loggedIn = false;
      state.username = '';
      state.type = '';
      state.jwt = ''; 
    }
  },
})

export const { logIn, logOut } = screenSlice.actions

export default screenSlice.reducer
