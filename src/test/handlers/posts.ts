import { config } from '../config';
import { mockDb, saveToLocalStorage } from '../db';
import { http, HttpResponse } from 'msw';

export const postHandlers = [
  http.get(`${config.API_URL}/posts`, () => {
    try {
      const posts = mockDb.post.getAll();
      return HttpResponse.json(posts);
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Error fetching posts' },
        { status: 500 },
      );
    }
  }),

  http.get(`${config.API_URL}/posts/:id`, (req) => {
    try {
      const { id } = req.params;
      const post = mockDb.post.findFirst({
        where: {
          id: {
            equals: Number(id),
          },
        },
      });

      if (!post) {
        return HttpResponse.json(
          { message: 'Post not found' },
          { status: 404 },
        );
      }

      return HttpResponse.json(post);
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Error fetching post' },
        { status: 500 },
      );
    }
  }),

  http.get(`${config.API_URL}/posts/user/:id`, (req) => {
    try {
      const { id } = req.params;
      const userPosts = mockDb.post.findMany({
        where: {
          userId: {
            equals: Number(id),
          },
        },
      });

      return HttpResponse.json(userPosts);
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Error fetching user posts' },
        { status: 500 },
      );
    }
  }),

  http.post(`${config.API_URL}/posts`, async ({ request }) => {
    try {
      const newPost: any = await request.json();

      const createdPost = mockDb.post.create({
        ...newPost,
        id: mockDb.post.count() + 1, // Generate new ID
        date: new Date().toISOString(), // Add current date
        reactions: newPost.reactions || {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        },
      });

      saveToLocalStorage();
      return HttpResponse.json(createdPost, { status: 201 });
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Error creating post' },
        { status: 500 },
      );
    }
  }),

  http.put(`${config.API_URL}/posts/:id`, async ({ params, request }) => {
    try {
      const { id } = params;
      const updatedPost: any = await request.json();

      const post = mockDb.post.update({
        where: {
          id: {
            equals: Number(id),
          },
        },
        data: {
          ...updatedPost,
          date: new Date().toISOString(), // Update date to current time
        },
      });

      if (!post) {
        return HttpResponse.json(
          { message: 'Post not found' },
          { status: 404 },
        );
      }

      saveToLocalStorage();
      return HttpResponse.json(post);
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Error updating post' },
        { status: 500 },
      );
    }
  }),

  http.delete(`${config.API_URL}/posts/:id`, ({ params }) => {
    try {
      const { id } = params;
      const post = mockDb.post.delete({
        where: {
          id: {
            equals: Number(id),
          },
        },
      });

      if (!post) {
        return HttpResponse.json(
          { message: 'Post not found' },
          { status: 404 },
        );
      }

      saveToLocalStorage();
      return HttpResponse.json(post); // Return deleted post
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Error deleting post' },
        { status: 500 },
      );
    }
  }),

  http.patch(`${config.API_URL}/posts/:postId`, async ({ params, request }) => {
    try {
      const { postId } = params;
      const { reactions } = (await request.json()) as any;

      const post = mockDb.post.update({
        where: {
          id: {
            equals: Number(postId),
          },
        },
        data: {
          reactions,
        },
      });

      if (!post) {
        return HttpResponse.json(
          { message: 'Post not found' },
          { status: 404 },
        );
      }

      saveToLocalStorage();
      return HttpResponse.json(post);
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Error updating reactions' },
        { status: 500 },
      );
    }
  }),
];
