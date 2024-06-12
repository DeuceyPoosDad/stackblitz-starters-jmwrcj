export class Column {
  public headerName: string = '';
  public cellName: string = '';
  public injectComponent: string = '';
  public inputComponent: string = '';
}

export const columnArr: Column[] = [
  {
    headerName: 'Fixed Component',
    cellName: 'fixedComponent',
    injectComponent: '',
    inputComponent: '',
  },
  {
    headerName: 'Dynamic Inject Component',
    cellName: 'dynamicComponent',
    injectComponent: 'DemoColumnComponent',
    inputComponent: '',
  },
  {
    headerName: 'Dynamic Input Component',
    cellName: 'dynamicComponent2',
    injectComponent: '',
    inputComponent: 'DemoColumnComponent',
  },
];
