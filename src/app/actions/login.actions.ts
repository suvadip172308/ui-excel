import { Action } from '@ngrx/store';

import { UserState } from '../models/common.state';

export const ADD_USER = '[LOGIN] Add User';
export const UPDATE_USERSTATUS = '[LOGIN] Update User Status';
export const REMOVE_USER = '[LOGIN] Remove User';

export class AddUser implements Action {
  readonly type = ADD_USER;
  constructor(readonly payload: UserState) {};
}

export class RemoveUser implements Action {
  readonly type = REMOVE_USER;
}

export type Actions = AddUser | RemoveUser;
