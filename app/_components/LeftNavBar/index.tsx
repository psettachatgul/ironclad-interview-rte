'use client';

import {
  Drawer,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import locale from '../../../locale/en-US';
import LeftNavBarDrawers from './LeftNavBarDrawers';
import { useState } from 'react';


const DRAWER_WIDTH = 280;

export default function LeftNavBar() {
  const [open, setOpen] = useState(true);

  const muiTheme = useTheme();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      {/* Mobile App Bar */}
      <AppBar
        position="sticky"
        sx={{
          display: { xs: 'flex', md: 'none' },
          backgroundColor: muiTheme.palette.mode === 'dark' ? '#1e1e1e' : '#fff',
          color: muiTheme.palette.mode === 'dark' ? '#fff' : '#000',
          boxShadow: 1,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label={locale.nav.menu}
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
            {locale.nav.appTitle}
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            backgroundColor: muiTheme.palette.mode === 'dark' ? '#1e1e1e' : '#fafafa',
            borderRight: `1px solid ${muiTheme.palette.mode === 'dark' ? '#333' : '#e0e0e0'}`,
          },
        }}
        anchor="left"
      >
        <LeftNavBarDrawers setOpen={setOpen} />
      </Drawer>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={open}
        onClose={toggleDrawer}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            backgroundColor: muiTheme.palette.mode === 'dark' ? '#1e1e1e' : '#fafafa',
          },
        }}
      >
        <LeftNavBarDrawers setOpen={setOpen} />
      </Drawer>
    </>
  );
}
