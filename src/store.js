import { configureStore } from '@reduxjs/toolkit';
import loginReducer from 'features/auth/login/loginSlice';

const store = configureStore({
  reducer: {
    login: loginReducer,
  },
});

export default store;
