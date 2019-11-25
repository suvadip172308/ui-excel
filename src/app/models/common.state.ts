export interface UserState {
  userName: string;
  name: string;
  isAdmin?: boolean;
};

export interface TransactionState {
  isEditMode?: boolean;
  isCreateMode?: boolean;
}

export interface AppState {
  user: UserState
  transaction: TransactionState
}