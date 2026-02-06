'use client';

import { useState } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  IconButton,
} from '@mui/material';
import { ErrorOutline as ErrorOutlineIcon } from '@mui/icons-material';
import { TFilterConfig } from '../_schemas';
import CriteriaValue from './CriteriaValue';
import { CriteriaInstance } from './types';
import locale from '../../../../_locale/en-US';

interface CriteriaProps {
  filterConfigs: TFilterConfig[];
  onChange: (key: string, value: unknown) => void;
  onNegateChange?: (key: string, negate: boolean) => void;
  currentCriteria: CriteriaInstance;
}
const Criteria = ({
  filterConfigs,
  onChange,
  onNegateChange,
  currentCriteria,
}: CriteriaProps) => {

  const [selectedKey, setSelectedKey] = useState<string>(currentCriteria.key);
  const [isNegated, setIsNegated] = useState<boolean>(currentCriteria.negate);

  const handleFieldChange = (event: SelectChangeEvent<string>) => {
    setSelectedKey(event.target.value);
  };

  const handleCriteriaValueChange = (value: unknown) => {
    onChange(selectedKey, value);
  };

  const handleNegateToggle = () => {
    const newNegateValue = !isNegated;
    setIsNegated(newNegateValue);
    onNegateChange?.(selectedKey, newNegateValue);
  };

  const selectedConfig = filterConfigs.find((config) => config.key === selectedKey);

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column', gap: 2,
      backgroundColor: isNegated ? 'error.main' : 'inherit',
    }}
    >
      {/* Negate Button and Field Selection */}
      <Box sx={{
        display: 'flex',
        gap: 1,
        alignItems: 'flex-start',
      }}
      >
        <IconButton
          size="small"
          onClick={handleNegateToggle}
          sx={{
            mt: 1,
            color: isNegated ? 'error.main' : 'action.disabled',
            '&:hover': {
              backgroundColor: isNegated ? 'error.light' : 'action.hover',
            },
          }}
          title={locale.criteria.negateCriteria}
        >
          <ErrorOutlineIcon fontSize="small" />
        </IconButton>

        <FormControl fullWidth size="small" variant="outlined">
          <InputLabel>{locale.criteria.selectField}</InputLabel>
          <Select
            value={selectedKey}
            onChange={handleFieldChange}
            label={locale.criteria.selectField}
            sx={{ mb: 1 }}
          >
            <MenuItem value="">
              <em>{locale.criteria.none}</em>
            </MenuItem>
            {filterConfigs.map((config) => (
              <MenuItem key={config.key} value={config.key}>
                {config.label}
              </MenuItem>
            ))}
          </Select>
          {/* Criteria Value Input */}
          {selectedConfig && (
            <CriteriaValue
              config={selectedConfig}
              onChange={handleCriteriaValueChange}
              currentValue={currentCriteria.value}
            />
          )}
        </FormControl>
      </Box>


    </Box >
  );
};

export default Criteria;
