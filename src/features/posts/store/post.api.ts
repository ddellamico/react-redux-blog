import { initialState, postsAdapter } from './post.slice';
import { PostItemType, PostsResponse } from './post.type';
import baseApi from '@/shared/store/api';
import { tagTypes } from '@/shared/store/types';

export const postApi = baseApi
  .enhanceEndpoints({ addTagTypes: [tagTypes.POST_TAG] })
  .injectEndpoints({
    endpoints: (build) => ({
      getPostList: build.query<PostsResponse, void>({
        query: () => 'posts',
        transformResponse: (responseData: PostItemType[]) => {
          const loadedPosts = responseData.map((post) => {
            if (!post?.date) {
              const yesterday = new Date();
              yesterday.setDate(yesterday.getDate() - 1);
              return {
                ...post,
                date: yesterday.toISOString(),
              };
            }
            return post;
          });
          return postsAdapter.setAll(initialState, loadedPosts);
        },
        providesTags: (result) =>
          result
            ? [
                { type: tagTypes.POST_TAG, id: 'LIST' },
                ...result.ids.map((id) => ({ type: tagTypes.POST_TAG, id })),
              ]
            : [{ type: tagTypes.POST_TAG, id: 'LIST' }],
      }),
      getPostsByUserId: build.query<PostsResponse, number>({
        query: (id) => `/posts/user/${id}`,
        transformResponse: (posts: PostItemType[]) =>
          postsAdapter.setAll(initialState, posts),
        providesTags: (result) =>
          result
            ? result.ids.map((id) => ({ type: tagTypes.POST_TAG, id }))
            : [{ type: tagTypes.POST_TAG, id: 'LIST' }],
      }),
      addPost: build.mutation<PostItemType, Partial<PostItemType>>({
        query: (post) => ({
          url: 'posts',
          method: 'POST',
          body: {
            ...post,
            date: new Date().toISOString(),
            reactions: post.reactions ?? {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        }),
        invalidatesTags: [{ type: tagTypes.POST_TAG, id: 'LIST' }],
      }),
      updatePost: build.mutation<PostItemType, Partial<PostItemType>>({
        query: (post) => ({
          url: `posts/${post.id}`,
          method: 'PUT',
          body: {
            ...post,
            date: new Date().toISOString(),
          },
        }),
        invalidatesTags: (args) => [{ type: tagTypes.POST_TAG, id: args?.id }],
      }),
      deletePost: build.mutation<PostItemType, Partial<PostItemType>>({
        query: ({ id }) => ({
          url: `posts/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: (args) => [{ type: tagTypes.POST_TAG, id: args?.id }],
      }),
      addReaction: build.mutation({
        query: ({ postId, reactions }) => ({
          url: `posts/${postId}`,
          method: 'PATCH',
          // Handling optimistic updates.
          // In a real app, we'd probably need to base this on user ID somehow
          // so that a user can't do the same reaction more than once
          body: { reactions },
        }),
        async onQueryStarted(
          { postId, reactions },
          { dispatch, queryFulfilled },
        ) {
          // `updateQueryData` requires the endpoint name and cache key arguments,
          // so it knows which piece of cache state to update
          const patchResult = dispatch(
            postApi.util.updateQueryData('getPostList', undefined, (draft) => {
              // The `draft` is Immer-wrapped and can be "mutated" like in createSlice
              const post = draft.entities[postId];
              if (post) {
                post.reactions = reactions;
              }
            }),
          );
          try {
            await queryFulfilled;
          } catch {
            patchResult.undo();
          }
        },
      }),
    }),
    overrideExisting: false,
  });

export const {
  useGetPostListQuery,
  useGetPostsByUserIdQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useAddReactionMutation,
} = postApi;
