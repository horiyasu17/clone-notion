import React from 'react';
import { useAuthorization } from 'src/hooks/useAuthorization';
import { Box } from '@mui/material';
import { Sidebar } from 'src/components/common/Sidebar';
import { Outlet } from 'react-router-dom';

export const AppLayout: React.FC = () => {
  // check user login
  useAuthorization();

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, p: 1, width: 'max-content' }}>
        <Outlet />
      </Box>
    </Box>
  );
};
