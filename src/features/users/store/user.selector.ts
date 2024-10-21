import { userApi } from './user.api';
import { usersAdapter } from './user.slice';
import { UsersResponse } from './user.type';
import { RootState } from '@/shared/store/types';
import { createSelector } from '@reduxjs/toolkit';

// Selector to get all users from RTK Query
export const selectUsers = userApi.endpoints.getUserList.select();

const selectUsersData = createSelector(
  selectUsers,
  (userResult): UsersResponse =>
    userResult?.data ?? usersAdapter.getInitialState(),
);

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
} = usersAdapter.getSelectors(
  (state: RootState) =>
    selectUsersData(state) ?? usersAdapter.getInitialState(),
);
