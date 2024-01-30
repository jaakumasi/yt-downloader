import { createReducer, on } from '@ngrx/store';
import { initialState } from './store.state';
import { changeTitle, changeUrl } from './store.actions';

export const initialStateReducer = createReducer(
  initialState,
  on(changeTitle, (state, action) => ({
    ...state,
    title: action.title,
  })),
  on(changeUrl, (state, action) => ({
    ...state,
    url: action.url,
  }))
);
