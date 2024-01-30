import { createAction, props } from '@ngrx/store';

export const changeTitle = createAction(
  'title-change',
  props<{ title: string }>()
);

export const changeUrl = createAction('url-change', props<{ url: string }>());
