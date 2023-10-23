import * as React from 'react';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';

export default function LoginPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <TextField fullWidth label="User" id="user" />
    </Box>
  );
}
