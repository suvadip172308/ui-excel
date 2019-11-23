import { Action } from '@ngrx/store';

import { UserState } from '../models/common.state';
import * as LoginActions from '../actions/login.actions';

const initialUserState: UserState = {
  userName: '',
  name: '',
  isAdmin: false
}

export function userReducer(state: UserState = initialUserState, action: LoginActions.Actions) {
  switch(action.type) {
    case LoginActions.ADD_USER:
      return {
        ...state,
        userName: action.payload.userName,
        name: action.payload.name
      };
    
    case LoginActions.UPDATE_USERSTATUS:
      return {
        ...state,
        isAdmin: action.payload.isAdmin || state.isAdmin
      };
    
    case LoginActions.REMOVE_USER:
      return initialUserState;
    
    default:
      return state;
  }
}