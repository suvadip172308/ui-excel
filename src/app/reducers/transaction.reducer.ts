import { TransactionState } from '../models/common.state';
import * as TransactionAction from '../actions/transaction.actions';

const initialTransactionState = {
  isCreateMode: false,
  isEditMode: false
};

export function transactionReducer(state: TransactionState = initialTransactionState, action: TransactionAction.Actions) {
 return 0;
}