/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import betterFetch from 'utils/betterFetch';

export const initialState = {};

const loginSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.loggingIn = 'LOADING';
    },
    loginSuccess(state, action) {
      const { details } = action.payload;
      state.me = details;
      state.authorized = true;
      state.loggingIn = 'SUCCESS';
    },
    loginFailure(state, action) {
      state.loggingIn = {
        status: 'FAILED',
        error: action.payload,
      };
    },
  },
});

export const {
  // login actions
  loginStart,
  loginSuccess,
  loginFailure,
} = loginSlice.actions;

export function login({
  email, password, keepCookie = false,
}, url = '/api/user/login') {
  return (dispatch) => {
    dispatch(loginStart());
    return betterFetch(url, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      keepCookie,
    })
      .then((res) => dispatch(loginSuccess({ res })))
      .catch((err) => dispatch(loginFailure({ err })));
  };
}

export default loginSlice.reducer;
