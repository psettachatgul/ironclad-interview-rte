'use client';

import { useState } from 'react';
import {
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  SvgIconProps,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export interface MenuItemConfig {
  id: string;
  label: string;
  icon?: React.ComponentType<SvgIconProps>;
  disabled?: boolean;
  divider?: boolean;
}

interface TableRowActionMenuProps {
  items: MenuItemConfig[];
  onItemClick: (itemId: string, rowData: Record<string, unknown>) => void;
  rowData: Record<string, unknown>;
  isLoading: boolean;
}

const TableRowActionMenu = ({
  items,
  onItemClick,
  rowData,
  isLoading,
}: TableRowActionMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (itemId: string) => {
    onItemClick(itemId, rowData);
    handleMenuClose();
  };

  if (isLoading) return <CircularProgress />;

  return (
    <>
      <IconButton
        id="table-row-action-menu-button"
        aria-controls={open ? 'table-row-action-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleMenuOpen}
        size="small"
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="table-row-action-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {items.map((item, index) => (
          <MenuItem
            key={item.id}
            onClick={() => handleMenuItemClick(item.id)}
            disabled={item.disabled}
            divider={item.divider}
          >
            {item.icon && <item.icon sx={{ mr: 1, fontSize: 20 }} />}
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default TableRowActionMenu;
