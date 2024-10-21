import { EntityState } from '@reduxjs/toolkit';

export type PostReaction = {
  thumbsUp: number;
  wow: number;
  heart: number;
  rocket: number;
  coffee: number;
};

export type PostItemType = {
  id: number;
  title: string;
  body: string;
  userId: number;
  date?: string | null;
  reactions?: PostReaction | null;
};

export type PostsResponse = EntityState<PostItemType, number>;
