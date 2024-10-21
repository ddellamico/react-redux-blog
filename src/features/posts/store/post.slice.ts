import { PostItemType } from './post.type';
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

export const postsAdapter = createEntityAdapter({
  selectId: (post: PostItemType) => post.id,
  sortComparer: (a, b) =>
    new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime(),
});

export const initialState = postsAdapter.getInitialState();

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
});
