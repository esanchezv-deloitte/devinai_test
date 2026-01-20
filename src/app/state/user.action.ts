import { createAction, props } from '@ngrx/store';

export const retrieveUser = createAction('[User Data] Retrieve User', props<{ payload: any }>());
export const addUser = createAction('[User Data] Add User', props<{ payload: any }>());
export const updateUser = createAction('[User Data] Update User', props<{ payload: any }>());
export const clearUser = createAction('[User Data] Clear User');
