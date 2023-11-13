'use client'
import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import LogoutIcon from '@mui/icons-material/Logout';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import HomeIcon from '@mui/icons-material/Home';
import { useCookies } from 'next-client-cookies';

const DRAWER_WIDTH = 240;

export default function SideDrawer() {
  const [logged, setLogged] = React.useState(false);
  const cookies = useCookies();

  React.useEffect(() => {
    if (cookies.get("user")) {
      if (cookies.get("password")) {
        setLogged(true)
      }
      else {
        cookies.remove("user")
        setLogged(false)
      }
    }
    else if (cookies.get("password")) {
      cookies.remove("password")
      setLogged(false)
    }
  }, []);

  function handleLogout() {
    cookies.remove("user")
    cookies.remove("password")
    setLogged(false)
    window.location.assign(process.env.NEXT_PUBLIC_MY_URL + "/login");
  }

  return (
    <div>

      <Drawer
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            height: 'auto',
            bottom: 0,
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <br />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Image src="/images/logo-white.png" alt='Logo' width={100} height={100}></Image>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography variant='h5' color="secondary">{process.env.NEXT_PUBLIC_NAME}</Typography>
        </div>

        <br />
        <Divider />
        <ButtonGroup
          orientation="vertical"
          aria-label="vertical contained button group"
          variant="text"
          color='secondary' size="large"
        >
          <Button href='/'><HomeIcon />  {process.env.NEXT_PUBLIC_HOME_BUTTON}</Button>
          <Button href='/admin'><AdminPanelSettingsIcon />  {process.env.NEXT_PUBLIC_ADMIN_BUTTON}</Button>
          {
            logged &&
            <Button onClick={handleLogout} color='error'><LogoutIcon /> {process.env.NEXT_PUBLIC_ADMIN_LOGOUT_BUTTON}</Button>
          }
        </ButtonGroup>
        <Divider />
      </Drawer>
    </div>
  )
}
