'use client';

import React, { useState } from 'react';
import { Avatar, Menu, MenuItem, IconButton } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/contexts/AuthContext';
import { authService } from '@/lib/services/authService';

export default function ProfileButton() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const { firstName, lastName, refreshAuth } = useAuth();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleClose();
    router.push('/profile');
  };

  const handleLogout = async () => {
    handleClose();
    const result = await authService.signOut();
    if (result.success) {
      await refreshAuth();
      router.push('/');
      router.refresh();
    }
  };

  const getInitials = () => {
    const first = firstName?.charAt(0).toUpperCase() || '';
    const last = lastName?.charAt(0).toUpperCase() || '';
    return first + last || 'U';
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{
          ml: 2,
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          },
        }}
      >
        <Avatar
          sx={{
            width: 32,
            height: 32,
            bgcolor: '#76a36d',
            color: '#050a1f',
            fontSize: '14px',
            fontWeight: 600,
          }}
        >
          {getInitials()}
        </Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        disableScrollLock
        PaperProps={{
          elevation: 8,
          sx: {
            mt: 1.5,
            minWidth: 140,
            maxWidth: 200,
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleProfile} sx={{ color: '#020B2C', fontSize: '0.875rem' }}>
          Profile
        </MenuItem>
        <MenuItem onClick={handleLogout} sx={{ color: '#020B2C', fontSize: '0.875rem' }}>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
