import { postHandlers } from './posts';
import { usersHandlers } from './users';

export const handlers = [...usersHandlers, ...postHandlers];
