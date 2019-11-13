export interface Login {
  userName: string;
  name: string;
};

export interface SpinnerConfig {
  panelClass?: string;
  hasBackdrop?: boolean;
  backdropClass?: string;
};

export interface Transaction {
  date: string,
  retailerName: string,
  companyName: string,
  routeName: string,
  agentName: string,
  invoiceAmount: number,
  payment: number,
}

export interface QueryParams {
  key: string,
  value: any
}