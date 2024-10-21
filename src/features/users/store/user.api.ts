import { initialState, usersAdapter } from './user.slice';
import { UserType, UsersResponse } from './user.type';
import baseApi from '@/shared/store/api';
import { tagTypes } from '@/shared/store/types';

export const userApi = baseApi
  .enhanceEndpoints({ addTagTypes: [tagTypes.USER_TAG] })
  .injectEndpoints({
    endpoints: (build) => ({
      getUserList: build.query<UsersResponse, void>({
        query: () => 'users',
        transformResponse: (users: UserType[]) =>
          usersAdapter.setAll(initialState, users), // NEADED ?
        providesTags: (result) =>
          result
            ? [
                { type: tagTypes.USER_TAG, id: 'LIST' },
                ...result.ids.map((id) => ({ type: tagTypes.USER_TAG, id })),
              ]
            : [{ type: tagTypes.USER_TAG, id: 'LIST' }],
      }),
      addUser: build.mutation<UserType, UserType>({
        query: (user) => ({
          url: 'users',
          method: 'POST',
          body: {
            ...user,
            date: new Date().toISOString(),
          },
        }),
        invalidatesTags: [{ type: tagTypes.USER_TAG, id: 'LIST' }],
      }),
      updateUser: build.mutation<UserType, Partial<UserType>>({
        query: (user) => ({
          url: `users/${user.id}`,
          method: 'PUT',
          body: {
            ...user,
            date: new Date().toISOString(),
          },
        }),
        invalidatesTags: (args) => [{ type: tagTypes.USER_TAG, id: args?.id }],
      }),
      deleteUser: build.mutation<UserType, Partial<UserType>>({
        query: ({ id }) => ({
          url: `users/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: (args) => [{ type: tagTypes.USER_TAG, id: args?.id }],
      }),
    }),
    overrideExisting: false,
  });

export const {
  useGetUserListQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
