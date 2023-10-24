'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import GitHubIcon from '@mui/icons-material/GitHub';
var cookie = require("@boiseitguru/cookie-cutter");

export default function HomePage() {

  function handleLogin() {
    if (!cookie.get("GH_AUTH_TOKEN")) {
      window.location.assign("" + process.env.NEXT_PUBLIC_GH_LOGIN_URL + process.env.NEXT_PUBLIC_GH_CLIENT_ID);
    }
  }
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
      <Typography variant="h5" component="h5">
        {process.env.NEXT_PUBLIC_MESSAGE}
      </Typography>

      <br />
      <Button variant="contained" size='large' color='primary' onClick={handleLogin}><GitHubIcon /> Login</Button>
    </Box>
  );
}
