/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  isAuthorised: false,
  gradingOrder: [],
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    appSuccess(state, action) {
      state.isAuthorised = "user";
      state.userData = action.payload.userData;
      const files = {};
      action.payload.files.forEach((file) => {
        files[file.type] = {
          name: file.file_name,
          time: file.created,
        };
      });
      if (action.payload.survey) {
        state.survey = action.payload.survey;
        const {
          city,
          school,
          gender,
          application_portal,
          application_process,
          improvement,
          informant,
        } = action.payload.survey;
        state.survey = {
          city,
          school,
          gender,
          applicationPortal: application_portal,
          applicationProcess: application_process,
          improvement,
          informant,
        };
      }
      state.files = files;
    },
    appFailure() {
      return initialState;
    },
    adminSuccess(state) {
      state.isAuthorised = "admin";
    },
    adminFailure() {
      return initialState;
    },
    updateSurvey(state, action) {
      state.survey = action.payload.survey;
    },
    uploadSuccess(state, action) {
      state.files[action.payload.fileType] = {
        name: action.payload.fileName,
        time: new Date().toISOString(),
      };
    },
    addPersonSuccess(state, action) {
      if (action.payload.index !== undefined) {
        state.userData.recommendations[action.payload.index] = {
          email: action.payload.email,
          received: false,
          send_date: new Date().toISOString(),
        };
      } else {
        state.userData.recommendations.push({
          email: action.payload.email,
          received: false,
          send_date: new Date().toISOString(),
        });
      }
    },
    logoutSuccess() {
      return initialState;
    },
    updateGradingOrder(state, action) {
      state.gradingOrder = action.payload;
    },
  },
});

export const {
  appSuccess,
  appFailure,
  adminSuccess,
  adminFailure,
  uploadSuccess,
  addPersonSuccess,
  logoutSuccess,
  updateGradingOrder,
} = appSlice.actions;

export default appSlice.reducer;
