import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "services/auth";
import { userApi } from "services/user";
import { applicationApi } from "services/application";
import { fileApi } from "services/file";
import { surveyApi } from "services/survey";
import auth from "features/auth/authSlice";
import { recommendationApi } from "services/recommendations";
import { adminApi } from "services/admins";

const persistConfig = {
  key: "root",
  whitelist: ["auth"],
  storage,
};

// Reducer with reset state on logout
const appReducer = combineReducers({
  auth,
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [applicationApi.reducerPath]: applicationApi.reducer,
  [fileApi.reducerPath]: fileApi.reducer,
  [surveyApi.reducerPath]: surveyApi.reducer,
  [recommendationApi.reducerPath]: recommendationApi.reducer,
  [adminApi.reducerPath]: adminApi.reducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === "auth/logout") {
    state = {
      auth: {},
      [authApi.reducerPath]: authApi.reducer(undefined, action),
      [userApi.reducerPath]: userApi.reducer(undefined, action),
      [applicationApi.reducerPath]: applicationApi.reducer(undefined, action),
      [fileApi.reducerPath]: fileApi.reducer(undefined, action),
      [surveyApi.reducerPath]: surveyApi.reducer(undefined, action),
      [recommendationApi.reducerPath]: recommendationApi.reducer(
        undefined,
        action
      ),
      [adminApi.reducerPath]: adminApi.reducer(undefined, action),
    };
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      authApi.middleware,
      userApi.middleware,
      applicationApi.middleware,
      fileApi.middleware,
      surveyApi.middleware,
      recommendationApi.middleware,
      adminApi.middleware
    ),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

export const persistor = persistStore(store);

export default store;
export type RootState = ReturnType<typeof store.getState>;
