import { postSelectors } from '.';
import { postApi } from './post.api';
import { postsAdapter } from './post.slice';
import { PostItemType, PostsResponse } from './post.type';
import { setupStore } from '@/shared/store/test';

// Create mock posts
const mockPosts: PostItemType[] = [
  {
    id: 1,
    title: 'Post 1',
    body: 'Body of post 1',
    userId: 1,
    reactions: { thumbsUp: 2, wow: 1, heart: 3, rocket: 0, coffee: 1 },
  },
  {
    id: 2,
    title: 'Post 2',
    body: 'Body of post 2',
    userId: 1,
    reactions: { thumbsUp: 5, wow: 2, heart: 1, rocket: 1, coffee: 0 },
  },
  {
    id: 3,
    title: 'Post 3',
    body: 'Body of post 3',
    userId: 2,
    reactions: { thumbsUp: 1, wow: 0, heart: 2, rocket: 2, coffee: 3 },
  },
];

// Normalize the posts using postsAdapter
const normalizedData: PostsResponse = postsAdapter.setAll(
  postsAdapter.getInitialState(),
  mockPosts,
);

describe('Post Selector:', () => {
  let store;

  beforeEach(async () => {
    store = setupStore();
    await store.dispatch(
      postApi.util.upsertQueryData('getPostList', undefined, normalizedData),
    );
  });

  it('selectAllPosts should return all posts from the state', () => {
    const allPosts = postSelectors.selectAllPosts(store.getState());
    expect(allPosts).toEqual(mockPosts);
  });

  it('selectPostById should return the correct post by ID', () => {
    const post = postSelectors.selectPostById(store.getState(), 1);
    expect(post).toEqual(mockPosts[0]);
  });

  it('selectPostIds should return an array of post IDs', () => {
    const postIds = postSelectors.selectPostIds(store.getState());
    expect(postIds).toEqual([1, 2, 3]);
  });

  it('selectPostsByUserId should return all posts by a specific user ID', async () => {
    // Filter posts for userId 1
    const userPosts = mockPosts.filter((post) => post.userId === 1);
    const normalizedUserPosts = postsAdapter.setAll(
      postsAdapter.getInitialState(),
      userPosts,
    );

    await store.dispatch(
      postApi.util.upsertQueryData('getPostsByUserId', 1, normalizedUserPosts),
    );

    const postsByUserId = postSelectors.selectPostsByUserId(1)(
      store.getState(),
    ); // For userId 1
    expect(postsByUserId).toEqual([mockPosts[0], mockPosts[1]]);
  });

  it('selectPostById should return undefined for a non-existent post ID', () => {
    const post = postSelectors.selectPostById(store.getState(), 999); // Non-existent post ID
    expect(post).toBeUndefined();
  });
});
