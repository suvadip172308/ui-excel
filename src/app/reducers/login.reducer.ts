import { Action } from '@ngrx/store';

import { User } from '../models/user.model';
import * as LoginActions from '../actions/login.actions';

const initialState: User = {
  userName: '',
  name: '',
  isAdmin: false
}

function loginReducer(state: User = initialState, action: LoginActions.Actions) {
  switch(action.type) {
    case LoginActions.ADD_USER:
      return {
        ...state,
        userName: action.payload.userName,
        name: action.payload.name,
        isAdmin: action.payload.isAdmin || false
      };
    
    case LoginActions.REMOVE_USER:
      return initialState;
    
    default:
      return initialState;
  }
}