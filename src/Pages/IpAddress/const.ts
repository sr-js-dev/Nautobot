export const pageTabs = [
  { label: 'New IP', title: 'Add a new IP address', value: '1' },
  {
    label: 'Bulk Create',
    title: 'Bulk Add IP Addresses',
    value: '2',
  },
];

export const natIpTabs = [
  {
    label: 'By Device',
    value: '1',
  },
  {
    label: 'By VM',
    value: '2',
  },
  {
    label: 'By IP',
    value: '3',
  },
];

export const nameSpace = [
  { value: 0, label: '' },
  { value: 1, label: 'Cleanup Namespace(1)' },
  { value: 2, label: 'Cleanup Namespace Nautobot Baseball Stadiums(1)' },
  { value: 3, label: 'Global' },
];

export const ipstatus = [
  { value: 0, label: '' },
  { value: 1, label: 'Anycast' },
  { value: 2, label: 'CARP' },
  { value: 3, label: 'GLBP' },
  { value: 4, label: 'HSRP' },
  { value: 5, label: 'Loopback' },
  { value: 6, label: 'Secondary' },
  { value: 7, label: 'VIP' },
  { value: 8, label: 'VRRP' },
];

export const ipRole = [
  { value: 0, label: '' },
  { value: 1, label: 'Active' },
  { value: 2, label: 'Deprecated' },
  { value: 3, label: 'NULL' },
  { value: 4, label: 'Reserved' },
];

export const ipType = [
  { value: 0, label: '' },
  { value: 1, label: 'DHCP' },
  { value: 2, label: 'Host' },
  { value: 3, label: 'SLAAC' },
];

export const tenantGroup = [{ value: 0, label: '' }, { value: 1, label: 'ABC Holding Corp' }];

export const tenant = [{ value: 0, label: '' }, { value: 1, label: 'ABC LLC' }];

export const location = [{ value: 0, label: '' }, { value: 1, label: 'Africa' }];

export const rack = [{ value: 0, label: '' }, { value: 1, label: 'ams01-101' }];

export const device = [{ value: 0, label: '' }, { value: 1, label: 'ams01-dist-01' }];

export const ip = [{ value: 0, label: '' }, { value: 1, label: '10.0.0.0/32' }];

export const cluster = [{ value: 0, label: '' }, { value: 1, label: 'mycluster' }];

export const vm = [{ value: 0, label: '' }, { value: 1, label: 'myvm' }];

export const vrf = [
  { value: 0, label: '' },
  { value: 1, label: 'Cleanup Namespace (1): (global)' },
  { value: 2, label: 'Global: (global)' },
];
