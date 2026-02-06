'use client';

import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  SelectChangeEvent,
} from '@mui/material';
import { TFilterConfig } from '../_schemas';
import locale from '../../../../_locale/en-US';

interface CriteriaValueProps {
  config: TFilterConfig;
  onChange: (value: unknown) => void;
  currentValue: unknown;
}

const CriteriaValue = ({ config, onChange, currentValue }: CriteriaValueProps) => {

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | { value: unknown; }>) => {

    const newValue = event.target.value;
    onChange(newValue);
  };

  const handleSelectChange = (event: SelectChangeEvent<unknown>) => {
    const newValue = event.target.value;
    onChange(newValue);
  };

  const renderInput = () => {
    switch (config.filterType) {
      case 'string':
        return (
          <TextField
            label={config.label}
            defaultValue={currentValue}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            size="small"
            placeholder={`Enter ${config.label}`}
          />
        );

      case 'number':
        return (
          <TextField
            label={config.label}
            defaultValue={currentValue}
            type="number"
            onChange={handleChange}
            fullWidth
            variant="outlined"
            size="small"
            placeholder={`Enter ${config.label}`}
          />
        );

      case 'date':
        return (
          <TextField
            label={config.label}
            defaultValue={currentValue}
            type="date"
            onChange={handleChange}
            fullWidth
            variant="outlined"
            size="small"
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
        );

      case 'select':
        return (
          <FormControl fullWidth size="small" variant="outlined">
            <InputLabel>{config.label}</InputLabel>
            <Select
              onChange={handleSelectChange}
              label={config.label}
              defaultValue={currentValue}
            >
              <MenuItem value="">
                <em>{locale.criteria.none}</em>
              </MenuItem>
              {config.options?.map((option) => (
                <MenuItem key={option.value?.toString()} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      {renderInput()}
    </Box>
  );
};

export default CriteriaValue;
