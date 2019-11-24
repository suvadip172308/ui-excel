import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';

import { environment } from '../../environments/environment';
import {
  AppState
} from '../models/common.state';

import { userReducer } from './login.reducer';

export const reducers: ActionReducerMap<AppState> = {
  user: userReducer
};

export const selectUser = (state: AppState) => state.user;

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
