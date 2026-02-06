'use client';

import { LinearProgress, Box, Typography } from '@mui/material';

interface UploadProgressBarProps {
  progress: number; // 0-100
  isVisible?: boolean;
}

export default function UploadProgressBar({ progress, isVisible = false }: UploadProgressBarProps) {
  if (!isVisible) {
    return null;
  }

  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress variant="determinate" value={progress} />
      <Typography variant="caption" sx={{ mt: 1, display: 'block', textAlign: 'center' }}>
        {Math.round(progress)}%
      </Typography>
    </Box>
  );
}
