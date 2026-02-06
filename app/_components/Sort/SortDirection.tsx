'use client';

import { useState } from 'react';
import {
  Box,
  IconButton,
  Typography,
} from '@mui/material';
import SwapVerticalCircleIcon from '@mui/icons-material/SwapVerticalCircle';
import locale from '../../../_locale/en-US';

interface SortDirectionProps {
  onChange: (direction: 1 | -1) => void;
}

const SortDirection = ({ onChange }: SortDirectionProps) => {
  const [direction, setDirection] = useState<1 | -1>(1);

  const handleToggle = () => {
    const newDirection = direction === 1 ? -1 : 1;
    setDirection(newDirection);
    onChange(newDirection);
  };

  const directionLabel = direction === 1 ? locale.sort.asc : locale.sort.desc;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Typography variant="body2">{directionLabel}</Typography>
      <IconButton
        size="small"
        onClick={handleToggle}
        sx={{
          transform: direction === -1 ? 'scaleY(-1)' : 'scaleY(1)',
          transition: 'transform 0.3s ease',
        }}
      >
        <SwapVerticalCircleIcon />
      </IconButton>
    </Box>
  );
};

export default SortDirection;
