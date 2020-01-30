/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  progress: 0
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    appSuccess(state, action) {
      state.userData = action.payload.userData;
      const files = {};
      let progress = 0;
      action.payload.files.forEach(file => {
        files[file.type] = {
          name: file.file_name,
          time: file.created
        };
        progress += 1;
      });
      state.files = files;
      state.progress = progress;
    },
    appFailure() {
      return initialState;
    },
    uploadSuccess(state, action) {
      state.files[action.payload.fileType] = {
        name: action.payload.fileName,
        time: new Date().toISOString()
      };
    },
    addPersonSuccess(state, action) {
      state.userData.recommendations.push({
        email: action.payload.email,
        received: false,
        send_date: new Date().toISOString()
      });
    },
    logoutSuccess() {
      return initialState;
    }
  }
});

export const {
  appSuccess,
  appFailure,
  uploadSuccess,
  addPersonSuccess,
  logoutSuccess
} = appSlice.actions;

export default appSlice.reducer;
