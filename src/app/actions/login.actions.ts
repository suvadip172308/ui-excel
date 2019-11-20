import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { User } from '../models/user.model';

export const ADD_USER = '[LOGIN] Add User';
export const REMOVE_USER = '[LOGIN] Remove User';

export class AddUser implements Action {
  readonly type = ADD_USER;
  constructor(public payload: User) {}
}

export class RemoveUser implements Action {
  readonly type = REMOVE_USER;
}

export type Actions = AddUser | RemoveUser;
