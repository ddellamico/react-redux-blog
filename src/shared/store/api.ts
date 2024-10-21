import { tagTypes } from './types';
import env from '@/shared/config/env';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// DEV ONLY!!!
const pause = (duration: number) => {
  if (process.env.NODE_ENV === 'test') {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: new URL('/', env.API_URL).href,
    fetchFn: async (...args) => {
      // REMOVE FOR PRODUCTION
      await pause(1000);
      return fetch(...args);
    },
  }),
  tagTypes: [tagTypes.POST_TAG, tagTypes.USER_TAG],
  endpoints: () => ({}),
});

export default baseApi;
