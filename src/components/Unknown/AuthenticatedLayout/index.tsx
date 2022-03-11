import { Box } from '@mui/material';
import React from 'react';

interface AuthenticatedLayoutProps {
  children: React.ReactElement;
}

const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({
  children,
}: AuthenticatedLayoutProps) => {
  return <Box>{children}</Box>;
};

export default AuthenticatedLayout;
