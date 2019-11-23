export interface UserState {
  userName: string;
  name: string;
  isAdmin?: boolean;
};

export interface AppState {
  user: UserState
}