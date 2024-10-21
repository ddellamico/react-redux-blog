import { postApi } from './post.api';
import { postsAdapter } from './post.slice';
import { PostsResponse } from './post.type';
import { RootState } from '@/shared/store/types';
import { createSelector } from '@reduxjs/toolkit';

const selectPostsData = createSelector(
  postApi.endpoints.getPostList.select(),
  (postResult): PostsResponse =>
    // If postResult or postResult.data is undefined, return an empty entity state
    postResult?.data ?? postsAdapter.getInitialState(),
);

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors(
  (state: RootState) =>
    selectPostsData(state) ?? postsAdapter.getInitialState(),
);

export const selectPostsByUserId = (userId: number) =>
  createSelector(
    postApi.endpoints.getPostsByUserId.select(userId),
    (postsResult) => {
      const postsData = postsResult?.data ?? postsAdapter.getInitialState();
      return postsData.ids.map((id) => postsData.entities[id]);
    },
  );
