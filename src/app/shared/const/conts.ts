import { SpinnerConfig } from '../../models/common.model';

export const SPINNER_DEFAULT_CONFIG: SpinnerConfig = {
  hasBackdrop: true,
  backdropClass: 'dark-backdrop',
  panelClass: 'spinner-display-panel'
}

export const PAGE_SIZE: number = 10;
export const FILE_SELECTION = 'No. file selected';

export const LINKS = [
  {
    name: 'home',
    viewName: 'Home',
    innerMenus: []
  },
  {
    name: 'upload',
    viewName: 'Upload File',
    innerMenus: []
  },
  {
    name: '#transaction',
    viewName: 'Transaction',
    innerMenus: [
      {
        name: 'transaction',
        viewName: 'Show Transaction'
      }, {
        name: 'create-transaction',
        viewName: 'Create Transaction'
      }, {
        name: 'delete-transaction',
        viewName: 'Delete Transaction'
      }
    ]
  },
  {
    name: '#retailer',
    viewName: 'Retailer',
    innerMenus: [
      {
        name: 'retailer',
        viewName: 'Show Retailer'
      }, {
        name: 'create-retailer',
        viewName: 'Create Retailer'
      }, {
        name: 'delete-retailer',
        viewName: 'Delete Retailer'
      }
    ]
  },
  {
    name: '#path',
    viewName: 'Path',
    innerMenus: [
      {
        name: 'path',
        viewName: 'Show Path'
      }, {
        name: 'create-path',
        viewName: 'Create Path'
      }, {
        name: 'delete-path',
        viewName: 'Delete Path'
      }
    ]
  },
];

export const UPLOAD_TYPES = [
  {
    value: 'transaction',
    viewValue: 'Transaction'
  },
  {
    value: 'retailer',
    viewValue: 'Retailer'
  },
  {
    value: 'route',
    viewValue: 'Route'
  },
];