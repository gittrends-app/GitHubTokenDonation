'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import GitHubIcon from '@mui/icons-material/GitHub';
import Alerta from '@/components/alerta';
import Image from 'next/image';
var cookie = require("@boiseitguru/cookie-cutter");

export default function HomePage() {

  function handleLogin() {
    if (!cookie.get("ghUser")) {
      window.location.assign("" + process.env.NEXT_PUBLIC_GH_LOGIN_URL + process.env.NEXT_PUBLIC_GH_CLIENT_ID);
    }
  }
  return (
    <div>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        <Alerta />
        <br />
        <Typography variant="h3" component="h3" color='primary'>
          {process.env.NEXT_PUBLIC_TITLE}
        </Typography>
        <br />
        <br />
        <Typography variant="h5" component="h5">
          {process.env.NEXT_PUBLIC_MESSAGE}
        </Typography>
      </Box>
        <br />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column-reverse',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          float: 'center'
        }}
      >
        <Button variant="contained" size='large' color='primary' onClick={handleLogin}><GitHubIcon /> {process.env.NEXT_PUBLIC_DONATE_BUTTON}</Button>

      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'end'
        }}
      >
        <Image src="/images/ghpet.png" alt='Logo' width={180} height={180}></Image>

      </Box>
    </div>
  );
}
