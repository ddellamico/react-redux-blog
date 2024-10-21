import { EntityState } from '@reduxjs/toolkit';

export type UserType = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
};

export type UsersResponse = EntityState<UserType, number>;
