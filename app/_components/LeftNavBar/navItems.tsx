'use client';

import DashboardIcon from '@mui/icons-material/Dashboard';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import locale from '../../../locale/en-US';
import { NavItem } from './types';
import UploadFileDialog, { UploadFileDialogPropTypes } from '../UploadFileDialog';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { ThemeContextType } from '../../_contexts/ThemeContext';

export const getNavBarItems = (
  router: AppRouterInstance,
  uploadFileDialogProps: UploadFileDialogPropTypes,
  themeContext: ThemeContextType | undefined,
): NavItem[] => {

  return [
    {
      id: 'home',
      label: locale.nav.items.home,
      icon: <DashboardIcon />,
      onClick: () => {
        router.push('/home');
      },
    },
    {
      id: 'uploadFile',
      label: locale.nav.items.importLog,
      icon: <UploadFileDialog {...uploadFileDialogProps} />,
      onClick: () => {
        uploadFileDialogProps.setOpen(true);
      },
    },
    {
      id: 'darkMode',
      label: locale.nav.items.darkMode,
      icon: <DarkModeIcon />,
      onClick: themeContext?.toggleDarkMode,
    },
  ];
};
