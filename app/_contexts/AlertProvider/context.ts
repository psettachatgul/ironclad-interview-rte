'use client';

import { createContext, ReactElement } from 'react';
import { TAlertSeverity } from './_schemas';


export type AlertMessage = string | ReactElement;

export type SetAlert = (
  severity: TAlertSeverity,
  message?: string | ReactElement,
) => void;

const AlertContext = createContext<SetAlert>(() => { });

export default AlertContext;
