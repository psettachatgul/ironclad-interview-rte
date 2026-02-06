'use client';

import {
  Box,
  Button,
  FormControlLabel,
  Switch,
  IconButton,
  Paper,
  Stack,
  useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import Criteria from './Criteria';
import { useFilter } from './useFilter';
import locale from '../../../_locale/en-US';
import { TFilter, TFilterConfig } from './_schemas';

interface FilterProps {
  filterConfigs: TFilterConfig[];
  onChange: (filter: TFilter) => void;
  currentFilter: TFilter;
}

export default function FilterComponent({
  filterConfigs,
  onChange,
  currentFilter = { all: true, criteria: [] },
}: FilterProps) {
  const theme = useTheme();

  const {
    all,
    criteriaInstances,
    handleAllChange,
    handleAddCriteria,
    handleRemoveCriteria,
    handleCriteriaValueChange,
    handleCriteriaNegateChange,
  } = useFilter({ onChange, currentFilter });

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* All/Some Switch */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <FormControlLabel
            control={
              <Switch checked={all} onChange={handleAllChange} />
            }
            label={all ? locale.filter.allCriteria : locale.filter.someCriteria}
          />
        </Box>

        {/* Criteria List */}
        <Stack spacing={2}>
          {criteriaInstances.map((instance) => (
            <Box
              key={instance.id}
              sx={{
                display: 'flex',
                gap: 2,
                alignItems: 'flex-start',
                p: 2,
                backgroundColor: theme.palette.background.default,
                borderRadius: 1,
                border: `1px solid ${theme.palette.divider}`,
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Criteria
                  filterConfigs={filterConfigs}
                  onChange={(key: string, value: unknown) => {
                    handleCriteriaValueChange(instance.id, key, value);
                  }}
                  onNegateChange={(key: string, negate: boolean) => {
                    handleCriteriaNegateChange(instance.id, key, negate);
                  }}
                  currentCriteria={instance}
                />
              </Box>
              <IconButton
                size="small"
                onClick={() => handleRemoveCriteria(instance.id)}
                sx={{ mt: 1 }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          ))}
        </Stack>

        {/* Add Button */}
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleAddCriteria}
          fullWidth
        >
          {locale.filter.addCriteria}
        </Button>
      </Box>
    </Paper>
  );
}
