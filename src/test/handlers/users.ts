import { config } from '../config';
import { mockDb } from '../db';
import { http, HttpResponse } from 'msw';

export const usersHandlers = [
  http.get(`${config.API_URL}/users`, () => {
    try {
      const users = mockDb.user.getAll();
      return HttpResponse.json(users);
    } catch (error: any) {
      return HttpResponse.json(
        { message: error?.message || 'Error fetching users' },
        { status: 500 },
      );
    }
  }),
];
