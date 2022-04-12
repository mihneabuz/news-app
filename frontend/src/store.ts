import { configureStore } from '@reduxjs/toolkit';
import screenReducer from './state/screenSlice';

export default configureStore({
  reducer: {
    screen: screenReducer
  },
})
