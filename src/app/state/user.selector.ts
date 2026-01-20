import { createFeatureSelector, createSelector } from '@ngrx/store';

export const getUserdata = createFeatureSelector<any>('user');

export const selectUserdata = createSelector(getUserdata, (state) => state);
