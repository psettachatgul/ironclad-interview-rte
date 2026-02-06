'use client';

import React from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Divider,
  Typography,
  useTheme,
} from '@mui/material';
import locale from '../../../locale/en-US';
import { useNavBarItems } from './useNavBarItems';
import { NavItem } from './types';

const LeftNavBarDrawers = ({
  setOpen,
}: {
  setOpen: (open: boolean) => void;
}) => {

  const muiTheme = useTheme();
  const { navItems } = useNavBarItems();

  const handleNavItemClick = (item: NavItem) => {
    if (item.onClick) {
      item.onClick();
    }
    // Close drawer on mobile after selection
    if (window.innerWidth < 600) {
      setOpen(false);
    }
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            color: '#1976d2',
          }}
        >
          {locale.nav.appTitle}
        </Typography>
      </Box>
      <Divider />
      <List sx={{ flex: 1 }}>
        {navItems.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton
              onClick={() => handleNavItemClick(item)}
              sx={{
                '&:hover': {
                  backgroundColor: muiTheme.palette.mode === 'dark' ? '#333' : '#f5f5f5',
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box sx={{ p: 2, color: muiTheme.palette.mode === 'dark' ? '#aaa' : '#666' }}>
        <Typography variant="caption">{locale.nav.version}</Typography>
      </Box>
    </Box>
  );
};

export default LeftNavBarDrawers;
