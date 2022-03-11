import { Box } from '@mui/material';
import React from 'react';

interface GuestLayoutProps {
  children: React.ReactElement;
}

const GuestLayout: React.FC<GuestLayoutProps> = ({ children }) => {
  return <Box>{children}</Box>;
};

export default GuestLayout;
