import React from 'react';
import { Box, Container } from '@mui/material';
import notionLogo from 'src/assets/images/logo.jpg';
import { Outlet } from 'react-router-dom';
import { useInitialize } from 'src/hooks/useInitialize';

export const AuthLayout: React.FC = () => {
  // initialize
  useInitialize();

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          mt: 6,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <img src={notionLogo} alt="logo" style={{ width: 100, height: 100, marginBottom: 3 }} />
        Notion Clone
      </Box>
      <Outlet />
    </Container>
  );
};
