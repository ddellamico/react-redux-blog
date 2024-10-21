import env from '../config/env';
import { postSlice } from '@/features/posts/store/post.slice';
import { userSlice } from '@/features/users/store/user.slice';
import baseApi from '@/shared/store/api';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  [userSlice.reducerPath]: userSlice.reducer,
  [postSlice.reducerPath]: postSlice.reducer,
});

export const storeConfig = {
  reducer: rootReducer,
  devTools: env.IS_DEV,
  middleware: (getDefaultMiddleware) =>
    // eslint-disable-next-line unicorn/prefer-spread
    getDefaultMiddleware().concat(baseApi.middleware),
};

export const store = configureStore(storeConfig);
