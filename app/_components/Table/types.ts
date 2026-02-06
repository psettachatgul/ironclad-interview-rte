import { TableCellProps } from '@mui/material';

export type ColConfig = {
  key: string;
  label: string;
  align?: TableCellProps['align'];
  render?: (value: unknown, record: unknown, rowIndex?: number) => React.ReactNode;
};
