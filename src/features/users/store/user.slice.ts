import { UserType } from './user.type';
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

export const usersAdapter = createEntityAdapter({
  selectId: (user: UserType) => user.id,
  // Keep the "all IDs" array sorted based on user names
  sortComparer: (a, b) => b.name.localeCompare(a.name),
});

export const initialState = usersAdapter.getInitialState();

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});
