import { SpinnerConfig } from '../../models/common.model';

export const SPINNER_DEFAULT_CONFIG: SpinnerConfig = {
  hasBackdrop: true,
  backdropClass: 'dark-backdrop',
  panelClass: 'spinner-display-panel'
}

export const PAGE_SIZE: number = 10;

export const LINKS = [
  {
    name: 'home',
    viewName: 'Home' 
  }, {
    name: 'transaction',
    viewName: 'Show Transaction'
  }, {
    name: 'create-transaction',
    viewName: 'Create Transaction'
  }, {
    name: 'delete-transaction',
    viewName: 'Delete Transaction'
  }, {
    name: 'retailer',
    viewName: 'Show Retailer'
  }, {
    name: 'create-retailer',
    viewName: 'Create Retailer'
  }, {
    name: 'delete-retailer',
    viewName: 'Delete Retailer'
  }
];