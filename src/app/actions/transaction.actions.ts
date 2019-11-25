import { Action } from '@ngrx/store';

import { TransactionState } from '../models/common.state';

export const CHANGE_CREATE_MODE = '[TRANSACTION] Change Create Mode';
export const CHANGE_EDIT_MODE = '[TRANSACTION] Change Edit Mode';

export class ChangeCreateMode implements Action {
  readonly type = CHANGE_CREATE_MODE;
  constructor(readonly payload: boolean) {};
}

export class ChangeEditMode implements Action {
  readonly type = CHANGE_EDIT_MODE;
  constructor(readonly payload: boolean) {};
}


export type Actions = ChangeCreateMode | ChangeEditMode;