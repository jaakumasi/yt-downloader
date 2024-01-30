import { isDevMode } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { initialStateReducer } from '../store/store.reducers';

export interface State {}

export const reducers: ActionReducerMap<State> = {
  initStateReducer: initialStateReducer,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
