import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";

import admin from "features/admin/adminSlice";
import auth from "features/auth/authSlice";
import files from "features/files/filesSlice";
import recommendations from "features/recommendations/recommendationsSlice";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import survey from "features/survey/surveySlice";

const persistConfig = {
  key: "root",
  whitelist: ["auth"],
  storage,
};

const rootReducer = combineReducers({
  auth,
  admin,
  files,
  recommendations,
  survey,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);

export default store;
export type RootState = ReturnType<typeof store.getState>;
