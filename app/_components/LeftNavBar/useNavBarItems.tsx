'use client';

import { useTheme as useCustomTheme } from '../../_contexts/ThemeContext';
import { useUpladFileDialog } from '../UploadFileDialog/useUpladFileDialog';
import { useRouter } from 'next/navigation';
import { getNavBarItems } from './navItems';

export const useNavBarItems = () => {

  const themeContext = useCustomTheme();
  const uploadFileProps = useUpladFileDialog();
  const router = useRouter();

  const navItems = getNavBarItems(router, uploadFileProps, themeContext);

  return {
    navItems,
  };


};
