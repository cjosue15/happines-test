export interface HeaderConfig {
  field: string;
  headerName: string;
  sortable?: boolean;
}

type SortOder = 'asc' | 'desc' | null;

export enum SortEnum {
  'ASC' = 'asc',
  'DESC' = 'desc',
}

export interface Sort {
  order: SortOder;
  column: string;
}

export interface Column<T> {
  field: string;
  headerName: string;
  renderCell?: (param: T) => JSX.Element;
  sortable?: boolean;
}

export interface ListProp<T> {
  headers: Column<T>[];
  rows: T[];
  loading: boolean;
  error: boolean;
  pagination?: {
    hasPagiantion: boolean;
    itemsPerPage: number;
  };
}
