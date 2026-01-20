import { createReducer, on } from '@ngrx/store';

import { retrieveUser, addUser, updateUser, clearUser } from './user.action';

export const initialState: any = {
  isLoggedIn: false,
  data: null,
  token: null,
};

export const userReducer = createReducer(
  initialState,
  on(retrieveUser, (state, { payload }) => payload),
  on(addUser, (state, { payload }) => payload),
  on(updateUser, (state, { payload }) => payload),
  on(clearUser, (state) => initialState),
);
