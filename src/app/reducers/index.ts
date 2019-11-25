import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';

import { environment } from '../../environments/environment';
import {
  AppState
} from '../models/common.state';

import { userReducer } from './login.reducer';
import { transactionReducer } from './transaction.reducer';

export const reducers: ActionReducerMap<AppState> = {
  user: userReducer,
  transaction: transactionReducer
};

export const selectUser = (state: AppState) => state.user;

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
