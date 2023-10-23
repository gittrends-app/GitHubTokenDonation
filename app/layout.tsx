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
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export const metadata = {
  title: 'Git Token Donation'
};

const DRAWER_WIDTH = 240;

const LINKS = [
  { text: 'Home', href: '/', icon: HomeIcon },
  { text: 'Admin', href: '/admin', icon: AdminPanelSettingsIcon },
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
              <Image src="/images/logo-white.png" alt='' width={100} height={100}></Image>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Typography variant='h5' color="secondary">GitTrends</Typography>
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
          <Alert severity="success">
            <AlertTitle>Obrigado</AlertTitle>
            Você doou com sucesso um token.
          </Alert>
            {children}
          </Box>
        </ThemeRegistry>
      </body>
    </html >
  );
}
