'use client';

import { Box, Stack, Paper, useTheme, TablePagination, TextField } from '@mui/material';
import Table from '../Table';
import { ColConfig } from '../Table/types';
import FilterDialog from '../FilterDialog';
import SortDialog from '../SortDialog';
import { SortConfig } from '../Sort/types';
import locale from '../../../_locale/en-US';
import { useTablePagination } from './useTablePagination';
import { TFilter, TFilterConfig } from '../Filter/_schemas';
import { TSort } from '../Sort/_schemas';

interface DataTableProps {
  data: Record<string, unknown>[];
  columns: ColConfig[];
  filterConfigs: TFilterConfig[];
  currentFilter: TFilter;
  sortConfigs: SortConfig[];
  currentSort: TSort;
  onFilterChange: (filter: TFilter) => void;
  onSortChange: (sorts: TSort) => void;
  isLoading?: boolean;
  totalRows: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
}

const DataTable = ({
  data,
  columns,
  filterConfigs,
  currentFilter,
  sortConfigs,
  currentSort,
  onFilterChange,
  onSortChange,
  isLoading = false,
  totalRows,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}: DataTableProps) => {
  const theme = useTheme();

  const {
    maxPage,
    pageInputValue,
    handlePageInputChange,
    handlePageInputKeyDown,
    handlePageInputBlur,
  } = useTablePagination({ page, totalRows, rowsPerPage, onPageChange });

  return (
    <Stack spacing={2}>
      <Paper
        sx={{
          p: 2,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 1,
          }}
        >
          <FilterDialog
            filterConfigs={filterConfigs}
            onChange={onFilterChange}
            onClose={() => undefined}
            currentFilter={currentFilter}
          />
          <SortDialog
            sortConfigs={sortConfigs}
            onChange={onSortChange}
            onClose={() => undefined}
            currentSort={currentSort}
          />
        </Box>
      </Paper>

      <Table columns={columns} data={data} isLoading={isLoading} />

      <Paper
        sx={{
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <TextField
            size="small"
            type="number"
            slotProps={{
              htmlInput: {
                min: 1,
                max: maxPage,
              },
            }}
            value={pageInputValue}
            onChange={handlePageInputChange}
            onBlur={handlePageInputBlur}
            onKeyDown={handlePageInputKeyDown}
            label={locale.dataTable?.goToPage || 'Go to page'}
            variant="outlined"
            sx={{ width: '120px' }}
          />
          <Box sx={{ fontSize: '0.875rem', color: theme.palette.text.secondary }}>
            {locale.dataTable?.ofPages || 'of'} {maxPage}
          </Box>
        </Box>

        <TablePagination
          component="div"
          count={totalRows}
          page={page}
          onPageChange={(_, newPage) => onPageChange(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(event) => onRowsPerPageChange(parseInt(event.target.value, 10))}
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
        />
      </Paper>
    </Stack>
  );
};

export default DataTable;
