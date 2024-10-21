import CreatePostPage from './Posts/CreatePostPage';
import EditPostPage from './Posts/EditPostPage';
import PostDetailsPage from './Posts/PostDetailsPage';
import UserPostsPage from './Users/UserPostsPage';
import UsersPage from './Users/UsersPage';
import { Header } from '@/UI/Layout/Header';
import { postApi } from '@/features/posts/store/post.api';
import { userApi } from '@/features/users/store/user.api';
import PostsPage from '@/routes/Posts/PostsPage';
import { useAppDispatch } from '@/shared/store/types';
import { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';

export function AppRoutes() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(postApi.endpoints.getPostList.initiate());
    dispatch(userApi.endpoints.getUserList.initiate());
  }, [dispatch]);

  const routes = [
    {
      path: '*',
      element: <PostsPage />,
    },
    {
      path: '/users',
      element: <UsersPage />,
    },
    {
      path: '/users/:userId',
      element: <UserPostsPage />,
    },
    {
      path: '/posts',
      element: <PostsPage />,
    },
    {
      path: '/posts/create',
      element: <CreatePostPage />,
    },
    {
      path: '/posts/edit/:postId',
      element: <EditPostPage />,
    },
    {
      path: '/posts/:postId',
      element: <PostDetailsPage />,
    },
  ];

  const element = useRoutes([...routes]);

  return (
    <>
      <Header
        menuItems={[
          { label: 'Home', href: '/', testId: 'home-link' },
          { label: 'Users', href: '/users', testId: 'user-link' },
        ]}
      />
      {element}
    </>
  );
}
