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
    viewName: 'Dashboard',
    innerMenus: []
  },
  {
    name: '#transaction',
    viewName: 'Transaction',
    innerMenus: [
      {
        name: 'transaction',
        viewName: 'Show Transaction',
        adminMenu: false
      }, {
        name: 'create-transaction',
        viewName: 'Create Transaction',
        adminMenu: false
      }, {
        name: 'delete-transaction',
        viewName: 'Delete Transaction',
        adminMenu: true
      }
    ]
  },
  {
    name: '#retailer',
    viewName: 'Retailer',
    innerMenus: [
      {
        name: 'retailer',
        viewName: 'Show Retailer',
        adminMenu: false
      }, {
        name: 'create-retailer',
        viewName: 'Create Retailer',
        adminMenu: false
      }, {
        name: 'delete-retailer',
        viewName: 'Delete Retailer',
        adminMenu: true
      }
    ]
  },
  {
    name: '#path',
    viewName: 'Path',
    innerMenus: [
      {
        name: 'path',
        viewName: 'Show Path',
        adminMenu: false
      }, {
        name: 'create-path',
        viewName: 'Create Path',
        adminMenu: false
      }, {
        name: 'delete-path',
        viewName: 'Delete Path',
        adminMenu: true
      }
    ]
  },
  {
    name: 'operators',
    viewName: 'Manage Operators',
    adminMenu: true,
    innerMenus: []
  },
  {
    name: 'upload',
    viewName: 'Upload File',
    innerMenus: []
  }
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
    value: 'path',
    viewValue: 'Route'
  },
];
