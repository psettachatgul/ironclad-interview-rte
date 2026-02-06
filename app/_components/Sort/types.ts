export type SortConfig = {
  key: string,
  label: string;
};

export type SortCrit = {
  key: string,
  sortDir: 1 | -1;
};

export interface SortInstance {
  id: string;
  key: string;
  sortDir: 1 | -1;
}
