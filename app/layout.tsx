import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import HomeIcon from '@mui/icons-material/Home';
import ThemeRegistry from '../components/ThemeRegistry/ThemeRegistry';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Head from 'next/head';
import Image from 'next/image';

export const metadata = {
  title: 'Git Token Donation'
};

const DRAWER_WIDTH = 240;

const LINKS = [
  { text: process.env.NEXT_PUBLIC_HOME_BUTTON, href: '/', icon: HomeIcon },
  { text: process.env.NEXT_PUBLIC_ADMIN_BUTTON, href: '/admin', icon: AdminPanelSettingsIcon },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <Head>
      </Head>
      <body>
        <ThemeRegistry>
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
              <Button href='/'><HomeIcon /> Home</Button>
              <Button href='/admin'><AdminPanelSettingsIcon /> Admin</Button>
            </ButtonGroup>
            <Divider />
          </Drawer>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              bgcolor: 'background.default',
              ml: `${DRAWER_WIDTH}px`,
              p: 3,
            }}
          >
            {children}
          </Box>
        </ThemeRegistry>
      </body>
    </html >
  );
}
