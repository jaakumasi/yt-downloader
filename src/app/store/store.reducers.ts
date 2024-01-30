import { createReducer, on } from '@ngrx/store';
import { initialState } from './store.state';
import { changeTitle, changeUrl } from './store.actions';

export const initialStateReducer = createReducer(
  initialState,
  on(changeTitle, (state, action) => {
    return {
      ...state,
      title: action.title,
    };
  }),
  on(changeUrl, (state, action) => {
    return {
      ...state,
      url: action.url,
    };
  })
);
