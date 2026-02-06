'use client';

import { useState } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Box,
} from '@mui/material';
import { SortConfig, SortCrit, SortInstance } from './types';
import SortDirection from './SortDirection';
import locale from '../../../_locale/en-US';

interface SortCriteriaProps {
  sortConfigs: SortConfig[];
  onChange: (sort: SortCrit) => void;
  currentSortInstance: SortInstance;
}

const SortCriteria = ({
  sortConfigs,
  onChange,
  currentSortInstance,
}: SortCriteriaProps) => {

  const [selectedKey, setSelectedKey] = useState<string>(currentSortInstance.key);
  const [sortDir, setSortDir] = useState<1 | -1>(currentSortInstance.sortDir);

  const handleFieldChange = (event: SelectChangeEvent<string>) => {
    const newKey = event.target.value;
    setSelectedKey(newKey);
    if (newKey) {
      onChange({
        key: newKey,
        sortDir,
      });
    }
  };

  const handleDirectionChange = (direction: 1 | -1) => {
    setSortDir(direction);
    if (selectedKey) {
      onChange({
        key: selectedKey,
        sortDir: direction,
      });
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', width: '100%' }}>
      <FormControl size="small" variant="outlined" sx={{ flex: 1 }}>
        <InputLabel>{locale.sort.selectField}</InputLabel>
        <Select
          value={selectedKey}
          onChange={handleFieldChange}
          label={locale.sort.selectField}
        >
          <MenuItem value="">
            <em>{locale.sort.none}</em>
          </MenuItem>
          {sortConfigs.map((config) => (
            <MenuItem key={config.key} value={config.key}>
              {config.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedKey && (
        <SortDirection onChange={handleDirectionChange} />
      )}
    </Box>
  );
};

export default SortCriteria;
