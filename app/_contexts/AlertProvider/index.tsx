'use client';

import React, { useState, SyntheticEvent } from 'react';
import { Snackbar, Alert, IconButton, SnackbarCloseReason } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { AxiosError } from 'axios';
import { TAlertSeverity } from './_schemas';
import AlertContext, { AlertMessage, SetAlert } from './context';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SnackbarCloseEvent = Event | SyntheticEvent<any | Event>;
type CloseAlertFn = (e: SnackbarCloseEvent, reason: SnackbarCloseReason) => void;

export interface AlertState {
  severity: TAlertSeverity;
  message?: AlertMessage;
  open: boolean;
}

const initialAlertProps: AlertState = {
  severity: 'none',
  message: '',
  open: false,
};
interface PropTypes {
  children: React.ReactNode;
}

const getDefaultMessage = (severity: string) => {
  switch (severity) {
    case 'success': return 'success';
    case 'warning': return 'warning';
    case 'error': return 'error';
    case 'info': return 'info';
    default: return '';
  }
};

const AlertProvider = ({ children }: PropTypes) => {
  const [{ severity, message, open }, setAlert] = useState<AlertState>(initialAlertProps);

  // add href support on error?
  const showAlert: SetAlert = (
    severity,
    payload = getDefaultMessage(severity),
  ) => {
    let message: AlertMessage = payload as AlertMessage;

    if (payload instanceof AxiosError) {
      message = String(payload.response?.data?.message);
    } else if (payload instanceof Error) {
      message = payload.message;
    }

    setAlert({
      severity,
      message,
      open: true,
    });
  };

  const handleClickClose = () => {
    setAlert(initialAlertProps);
  };

  const handleAutoClose: CloseAlertFn = (e, reason) => {
    if (reason !== 'clickaway') setAlert(initialAlertProps);
  };

  return (
    <AlertContext.Provider value={showAlert}>
      {severity && (
        <Snackbar
          open={open}
          autoHideDuration={severity !== 'error' ? 5000 : null}
          onClose={handleAutoClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          sx={{
            whiteSpace: 'pre-line',
            '&.MuiSnackbar-root': {
              top: '6px',
            },
          }}
        >
          <Alert
            data-testid="alert" // let's deprecate this
            role="alert"
            severity={severity !== 'none' ? severity : undefined}
            action={(
              <IconButton
                aria-label="close"
                size="small"
                color="inherit"
                onClick={handleClickClose}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            )}
          >
            {message}
          </Alert>
        </Snackbar>
      )}
      {children}
    </AlertContext.Provider>
  );
};

export default AlertProvider;
