'use client';

import { FormProvider, UseFormReturn, FieldValues } from 'react-hook-form';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import React, { BaseSyntheticEvent } from 'react';

interface FormProps<T extends FieldValues = FieldValues> {
  formName?: string;
  title?: string;
  formProps: UseFormReturn<T>;
  children: React.ReactNode;
  actions?: React.ReactNode;
  onSubmit: (
    values: T,
    event?: BaseSyntheticEvent,
  ) => void | Promise<void>;
}

const Form = <T extends FieldValues = FieldValues>({
  formName,
  title,
  formProps,
  children,
  actions,
  onSubmit,
}: FormProps<T>) => {

  const theme = useTheme();

  const handleSubmit = formProps.handleSubmit(async (values, event) => {
    await onSubmit(values, event);
  });

  return (
    <FormProvider {...formProps}>
      <Box
        component="form"
        {...(!!formName && { name: formName })}
        onSubmit={handleSubmit}
        noValidate
      >
        {!!title && (
          <Typography variant="h2">
            {title}
          </Typography>
        )}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Form content */}
          {children}

          {/* Action buttons row */}
          {!!actions && (
            <Stack
              direction="row"
              spacing={1}
              sx={{
                mt: 3,
                pt: 2,
                borderTop: `1px solid ${theme.palette.divider}`,
                justifyContent: 'flex-end',
              }}
            >
              {actions}
            </Stack>
          )}
        </Box>
      </Box>
    </FormProvider>
  );
};

export default Form;
