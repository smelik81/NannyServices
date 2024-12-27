import { configureStore } from '@reduxjs/toolkit';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './auth/slice.js';
import nanniesReducer from './nannies/slice.js';

const authPersistConfig = {
  key: 'auth-token',
  storage,
  whitelist: ['token'],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

const nanniesPersistConfig = {
  key: 'nannies',
  storage,
};

const persistedNanniesReducer = persistReducer(
  nanniesPersistConfig,
  nanniesReducer
);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    nannies: persistedNanniesReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
