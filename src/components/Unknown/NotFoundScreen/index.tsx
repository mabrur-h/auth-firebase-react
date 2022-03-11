import { Box, Typography } from '@mui/material';
import React from 'react';

const NotFoundScreen: React.FC = () => (
  <Box
    height="100vh"
    display="flex"
    justifyContent="center"
    alignItems="center"
  >
    <Typography variant="h1">Page not found</Typography>
  </Box>
);

export default NotFoundScreen;
