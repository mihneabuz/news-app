import { configureStore } from '@reduxjs/toolkit';
import screenReducer from './state/screenSlice';
import userReducer from './state/userSlice';

export default configureStore({
  reducer: {
    screen: screenReducer,
    user: userReducer
  },
})
