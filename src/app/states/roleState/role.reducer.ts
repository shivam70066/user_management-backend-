import { setRole } from './role.actions';
import { createReducer, on } from "@ngrx/store"

export interface RoleState{
  role_slug: string
}

const initialRoleState:RoleState = {
  role_slug:"employee"
}

export const roleReducer = createReducer(
  initialRoleState,
  on(setRole, (state, { role_slug }) => ({ ...state, role_slug }))
)
