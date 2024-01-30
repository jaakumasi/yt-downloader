import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { initialStateReducer } from '../store/store.reducers';

export interface State {}

export const reducers: ActionReducerMap<State> = {
  initialStateReducer: initialStateReducer,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
