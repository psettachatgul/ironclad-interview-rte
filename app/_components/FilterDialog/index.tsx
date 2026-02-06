'use client';

import { useState, useMemo } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Chip,
  Box,
} from '@mui/material';
import FilterComponent from '../Filter';
import SearchIcon from '@mui/icons-material/Search';
import locale from '../../../_locale/en-US';
import { TFilter, TFilterConfig } from '../Filter/_schemas';

interface FilterDialogProps {
  onClose: () => void;
  onChange: (filter: TFilter) => void;
  filterConfigs: TFilterConfig[];
  currentFilter: TFilter;
}

export default function FilterDialog({
  onClose,
  onChange,
  filterConfigs,
  currentFilter,
}: FilterDialogProps) {

  const [open, setOpen] = useState<boolean>(false);

  const filterChipLabel = useMemo(() => {
    if (!currentFilter.criteria || currentFilter.criteria.length === 0) {
      return locale.filterDialog.noFilters;
    }
    return `${currentFilter.criteria.length} filter${currentFilter.criteria.length !== 1 ? 's' : ''}`;
  }, [currentFilter]);

  return (
    <>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          onClose();
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{locale.filterDialog.title}</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <FilterComponent
            filterConfigs={filterConfigs}
            onChange={onChange}
            currentFilter={currentFilter}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
              onClose();
            }}
            color="primary"
          >
            {locale.filterDialog.ok}
          </Button>
        </DialogActions>
      </Dialog>
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Chip
          label={filterChipLabel}
          size="small"
          variant={currentFilter.criteria && currentFilter.criteria.length > 0 ? 'filled' : 'outlined'}
        />
        <IconButton onClick={() => setOpen(true)}>
          <SearchIcon />
        </IconButton>
      </Box>
    </>
  );
}
