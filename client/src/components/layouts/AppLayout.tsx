import React from 'react';
import { Box } from '@mui/material';
import { Sidebar } from 'src/components/common/Sidebar';
import { Outlet } from 'react-router-dom';
import { useInitialize } from 'src/hooks/useInitialize';

export const AppLayout: React.FC = () => {
  // initialize
  useInitialize();

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, p: '30px 20px' }}>
        <Outlet />
      </Box>
    </Box>
  );
};
