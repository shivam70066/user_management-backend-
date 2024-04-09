import {createAction, props} from "@ngrx/store"



export const setRole = createAction(
  '[Role] Set Role',
  props<{ role_slug: string }>()
);
