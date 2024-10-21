import { postSlice } from './post.slice';

export * as postApi from './post.api';
export * as postSelectors from './post.selector';

export const TodoActions = {
  ...postSlice.actions,
};
