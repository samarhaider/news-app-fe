import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import newsReducer from './slices/newsSlice';
import preferenceReducer from './slices/preferencesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    news: newsReducer,
    preferences: preferenceReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
