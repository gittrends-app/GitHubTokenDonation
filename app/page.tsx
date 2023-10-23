import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function HomePage() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
      }}
    >
      <Typography variant="h3" component="h3" color='primary'>
        {process.env.NEXT_PUBLIC_TITLE}
      </Typography>
      <br />
      <br />
      <Typography  variant="h5" component="h5">
        {process.env.NEXT_PUBLIC_MESSAGE}
      </Typography>

      <br />
      <Button variant="contained" size='large' color='primary'><GitHubIcon /> Login</Button>
    </Box>
  );
}
