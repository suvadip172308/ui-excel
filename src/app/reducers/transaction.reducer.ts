import { TransactionState } from '../models/common.state';
import * as TransactionAction from '../actions/transaction.actions';

const initialTransactionState = {
  isCreateMode: false,
  isEditMode: false
};

export function transactionReducer(state: TransactionState = initialTransactionState, action: TransactionAction.Actions) {
  switch(action.type) {
    case TransactionAction.CHANGE_CREATE_MODE:
      return {
        ...state,
        isCreateMode: action.payload
      };
    
    case TransactionAction.CHANGE_EDIT_MODE:
      return {
        ...state,
        isEditMode: action.payload
      }
  }
}