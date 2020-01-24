/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import betterFetch from 'utils/betterFetch';

export const initialState = {};

const loginSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.loggingIn = true;
    },
    loginSuccess(state, action) {
      const { details } = action.payload;
      state.me = details;
      state.authorized = true;
      state.loggingIn = false;
    },
    loginFailure(state, action) {
      state.loggingIn = false;
      const error = {
        ...action.payload,
        fetchError: action.payload.err.fetchError && true,
        msg: 'fetch error',
      };
      state.error = error;
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
